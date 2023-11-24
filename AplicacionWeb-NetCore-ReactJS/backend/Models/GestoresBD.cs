using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class GestoresBD
    {
        [Key]
        public int id { get; set; } = 0;
        public string nombre { get; set; }  = "";   
        public int lanzamiento { get; set; } = 0;
        public string desarrollador { get; set; } = "";
    }
}
