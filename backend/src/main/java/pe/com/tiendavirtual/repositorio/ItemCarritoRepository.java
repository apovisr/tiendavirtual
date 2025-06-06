package pe.com.tiendavirtual.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;
import pe.com.tiendavirtual.modelo.ItemCarrito;

import java.util.List;

public interface ItemCarritoRepository extends JpaRepository<ItemCarrito, Long> {
    List<ItemCarrito> findByCarritoId(Long carritoId);
}
