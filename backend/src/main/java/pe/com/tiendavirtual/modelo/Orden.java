package pe.com.tiendavirtual.modelo;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "ORDEN")
@Data
public class Orden {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="numero")
    private String numero;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idCarrito")
    private Carrito carrito;

    @Column(name="fecha")
    @Temporal(TemporalType.DATE)
    private Date fecha;

    @Column(name="subTotal")
    private double subTotal;

    @Column(name="igv")
    private double igv;

    @Column(name="total")
    private double total;

    @OneToMany(mappedBy = "orden", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @JsonManagedReference("order-items")
    private List<ItemOrden> items = new ArrayList<>();
}
