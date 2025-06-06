package pe.com.tiendavirtual.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;
import pe.com.tiendavirtual.modelo.Orden;

import java.util.List;

public interface OrdenRepository extends JpaRepository<Orden, Long> {
    List<Orden> findByCarritoId(Long carritoId);
}
