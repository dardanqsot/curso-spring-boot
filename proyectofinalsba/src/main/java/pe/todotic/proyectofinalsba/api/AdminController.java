package pe.todotic.proyectofinalsba.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import pe.todotic.proyectofinalsba.exception.BadRequestException;
import pe.todotic.proyectofinalsba.model.Libro;
import pe.todotic.proyectofinalsba.repo.LibroRepository;
import pe.todotic.proyectofinalsba.service.FileSystemStorageService;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@RestController
@RequestMapping("/api/admin/libros")
public class AdminController extends BaseController {

    @Autowired
    private LibroRepository libroRepository;

    @Autowired
    private FileSystemStorageService fileSystemStorageService;

    @PostMapping("")
    Libro crearLibro(@RequestBody @Validated Libro libro) {
        boolean slugYaExiste = libroRepository.existsBySlug(libro.getSlug());

        if (slugYaExiste) {
            throw new BadRequestException("El slug ya fue registrado.");
        }
        return libroRepository.save(libro);
    }

    @GetMapping("")
    Page<Libro> getLibros(@PageableDefault(sort = "titulo", size = 5) Pageable pageable) {
        Page<Libro> libroPage = libroRepository.findAll(pageable);

        libroPage.forEach(libro -> {
            libro.setUrlArchivo(  buildUriString(libro.getRutaArchivo())  );
            libro.setUrlPortada(  buildUriString(libro.getRutaPortada()) );
        });

        return libroPage;
    }

    @GetMapping("/{id}")
    Libro getLibro(@PathVariable Integer id) {
        Libro libro = libroRepository.findById(id)
                .orElseThrow(EntityNotFoundException::new);

        libro.setUrlArchivo(  buildUriString(libro.getRutaArchivo())  );
        libro.setUrlPortada(  buildUriString(libro.getRutaPortada()) );

        return libro;
    }

    @PutMapping("/{id}")
    Libro actualizarLibro(@PathVariable Integer id, @RequestBody @Validated Libro libro) {
        Libro libroFromDb = libroRepository.findById(id)
                .orElseThrow(EntityNotFoundException::new);

        boolean slugYaExiste = libroRepository.existsBySlugAndIdNot(libro.getSlug(), id);

        if (slugYaExiste) {
            throw new BadRequestException("El slug ya fue registrado.");
        }

        libroFromDb.setPrecio(libro.getPrecio());
        libroFromDb.setDescripcion(libro.getDescripcion());
        libroFromDb.setRutaArchivo(libro.getRutaArchivo());
        libroFromDb.setRutaPortada(libro.getRutaPortada());
        libroFromDb.setSlug(libro.getSlug());
        libroFromDb.setTitulo(libro.getTitulo());

        return libroRepository.save(libroFromDb);
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{id}")
    void eliminarLibro(@PathVariable Integer id) {
        Libro libro = libroRepository.findById(id)
                .orElseThrow(EntityNotFoundException::new);

        libroRepository.delete(libro);
    }

}
