package pe.todotic.proyectofinalsba.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import pe.todotic.proyectofinalsba.exception.BadRequestException;
import pe.todotic.proyectofinalsba.model.ItemVenta;
import pe.todotic.proyectofinalsba.model.Libro;
import pe.todotic.proyectofinalsba.model.Usuario;
import pe.todotic.proyectofinalsba.model.Venta;
import pe.todotic.proyectofinalsba.repo.ItemVentaRepository;
import pe.todotic.proyectofinalsba.repo.LibroRepository;
import pe.todotic.proyectofinalsba.repo.UsuarioRepository;
import pe.todotic.proyectofinalsba.repo.VentaRepository;
import pe.todotic.proyectofinalsba.service.FileSystemStorageService;

import javax.persistence.EntityNotFoundException;
import java.security.Principal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class PublicController extends BaseController {

    @Autowired
    private LibroRepository libroRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private VentaRepository ventaRepository;

    @Autowired
    private ItemVentaRepository itemVentaRepository;

    @Autowired
    private FileSystemStorageService fileSystemStorageService;

    @GetMapping("ultimos-libros")
    List<Libro> getUltimosLibros() {
        List<Libro> ultimosLibros = libroRepository.findTop6ByOrderByFechaCreacionDesc();

        ultimosLibros.forEach(libro -> {
            libro.setUrlArchivo(buildUriString(libro.getRutaArchivo()));
            libro.setUrlPortada(buildUriString(libro.getRutaPortada()));
        });

        return ultimosLibros;
    }

    @GetMapping("libros")
    Page<Libro> getLibros(@PageableDefault(sort = "titulo", size = 10) Pageable pageable) {
        Page<Libro> libroPage = libroRepository.findAll(pageable);

        libroPage.forEach(libro -> {
            libro.setUrlArchivo(buildUriString(libro.getRutaArchivo()));
            libro.setUrlPortada(buildUriString(libro.getRutaPortada()));
        });

        return libroPage;
    }

    @GetMapping("/libros/{slug}")
    Libro getLibro(@PathVariable String slug) {
        Libro libro = libroRepository.findOneBySlug(slug)
                .orElseThrow(EntityNotFoundException::new);

        libro.setUrlArchivo(buildUriString(libro.getRutaArchivo()));
        libro.setUrlPortada(buildUriString(libro.getRutaPortada()));

        return libro;
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("auth/registro")
    void registrarUsuario(@RequestBody @Validated Usuario usuario) {
        boolean emailExiste = usuarioRepository.existsByEmail(usuario.getEmail());

        if (emailExiste) {
            throw new BadRequestException("El email ya fue registrado para otro usuario.");
        }
        usuario.setRol(Usuario.Rol.LECTOR);
        // TODO: establecer la contraseña del usuario
        usuarioRepository.save(usuario);
    }

    @GetMapping("/auth/verificar-email")
    Map<String, Boolean> verificarEmail(@RequestParam String email) {
        boolean emailExiste = usuarioRepository.existsByEmail(email);

        Map<String, Boolean> resultado = new HashMap<>();
        resultado.put("exists", emailExiste);

        return resultado;
    }

    @PostMapping("pagar-compra")
    Venta pagarCompra(@RequestBody List<Integer> idLibros, Principal principal) {
        List<ItemVenta> items = new ArrayList<>();
        float total = 0;
        Usuario usuario = null;
        Venta venta = new Venta();

        if (principal != null) {
            usuario = usuarioRepository.findByEmail(principal.getName())
                    .orElseThrow(EntityNotFoundException::new);
        }

        for (Integer idLibro : idLibros) {
            Libro libro = libroRepository.findById(idLibro)
                    .orElseThrow(EntityNotFoundException::new);

            ItemVenta itemVenta = new ItemVenta();
            itemVenta.setLibro(libro);
            itemVenta.setPrecio(libro.getPrecio());
            itemVenta.setNumeroDescargasDisponibles(3);
            itemVenta.setVenta(venta);

            items.add(itemVenta);

            total += itemVenta.getPrecio();
        }

        venta.setFecha(LocalDateTime.now());
        venta.setItems(items);
        venta.setTotal(total);
        venta.setUsuario(usuario);

        return ventaRepository.save(venta);
    }

    @GetMapping("detalles-compra/{idVenta}")
    Venta getVenta(@PathVariable Integer idVenta) {
        Venta venta = ventaRepository.findById(idVenta)
                .orElseThrow(EntityNotFoundException::new);

        venta.getItems().forEach(item -> {
            item.getLibro().setUrlArchivo(buildUriString(  item.getLibro().getRutaArchivo()  ));
            item.getLibro().setUrlPortada(buildUriString(  item.getLibro().getRutaPortada()  ));
        });

        return venta;
    }

    @GetMapping("/descargar-archivo/{idItemVenta}")
    Resource getArchivoItemVenta(@PathVariable Integer idItemVenta) {
        ItemVenta itemVenta = itemVentaRepository.findById(idItemVenta)
                .orElseThrow(EntityNotFoundException::new);

        if (itemVenta.getNumeroDescargasDisponibles() > 0) {
            itemVenta.disminuirDescargasDisponibles();
            itemVentaRepository.save(itemVenta);
        } else {
            throw new BadRequestException("No tienes ninguna descarga disponible para este libro.");
        }

        return fileSystemStorageService.loadAsResource(itemVenta.getLibro().getRutaArchivo());
    }

}
