package pe.todotic.proyectofinalsba.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;

public class BaseController {

    @Autowired
    private HttpServletRequest request;

    String buildUriString(String ruta) {
        if (ruta != null) {
            String host = request.getRequestURL().toString().replace(request.getRequestURI(), "");

            return ServletUriComponentsBuilder
                    .fromHttpUrl(host)
                    .path("/api/assets/")
                    .path(ruta)
                    .toUriString();
        }
        return null;
    }

}
