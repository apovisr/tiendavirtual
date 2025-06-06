package pe.com.tiendavirtual.modelo;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "ITEMORDEN")
@Data
public class ItemOrden {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idOrden")
    @JsonBackReference("order-items")
    private Orden orden;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idProducto")
    @JsonBackReference
    private Producto producto;

    @Column(name="cantidad")
    private int cantidad;

    @Column(name="subTotal")
    private double subTotal;
}
