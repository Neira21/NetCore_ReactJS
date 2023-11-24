using System;
using System.Collections.Generic;

namespace PROYECTO_LISTA_TAREAS.Models;

public partial class Tarea
{
    public int TareaId { get; set; }

    public string? NombreTarea { get; set; }

    public DateTime? FechaRegistro { get; set; }
}
