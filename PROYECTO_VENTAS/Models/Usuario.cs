using System;
using System.Collections.Generic;

namespace PROYECTO_VENTAS.Models
{
    public partial class Usuario
    {
        public Usuario()
        {
            Venta = new HashSet<Ventum>();
        }

        public int IdUsuario { get; set; }
        public string? Nombre { get; set; }
        public string? Correo { get; set; }
        public string? Telefono { get; set; }
        public int? IdRol { get; set; }
        public string? Clave { get; set; }
        public bool? EsActivo { get; set; }

        public virtual Rol? IdRolNavigation { get; set; }
        public virtual ICollection<Ventum> Venta { get; set; }
    }
}
