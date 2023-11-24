using System;
using System.Collections.Generic;

namespace PROYECTO_VENTAS.Models
{
    public partial class Producto
    {
        public Producto()
        {
            DetalleVenta = new HashSet<DetalleVentum>();
        }

        public int IdProducto { get; set; }
        public string? Codigo { get; set; }
        public string? Marca { get; set; }
        public string? Descripcion { get; set; }
        public int? IdCategoria { get; set; }
        public int? Stock { get; set; }
        public decimal? Precio { get; set; }
        public bool? EsActivo { get; set; }
        public DateTime? FechaRegistro { get; set; }

        public virtual Categorium? IdCategoriaNavigation { get; set; }
        public virtual ICollection<DetalleVentum> DetalleVenta { get; set; }
    }
}
