using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PROYECTO_LISTA_TAREAS.Models;
using System.Diagnostics.Contracts;

namespace PROYECTO_LISTA_TAREAS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TareaController : ControllerBase
    {
        private readonly ListaTareasContext _context;

        public TareaController(ListaTareasContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("Lista")]
        public async Task<IActionResult> Lista()
        {
            List<Tarea> lista = await _context.Tareas.OrderByDescending(t=>t.TareaId).ThenBy(t=>t.FechaRegistro).ToListAsync();   
            return StatusCode(StatusCodes.Status200OK, lista);
        }

        [HttpPost]
        public async Task<IActionResult> Crear(Tarea tarea)
        {
            _context.Tareas.Add(tarea);
            await _context.SaveChangesAsync();
            return StatusCode(StatusCodes.Status200OK, "ok");

        }


        [HttpDelete]
        [Route("Eliminar/{id}")]
        public async Task<IActionResult> Eliminar(int id)
        {
            Tarea tarea = await _context.Tareas.FindAsync(id);
            _context.Tareas.Remove(tarea);
            await _context.SaveChangesAsync();
            return StatusCode(StatusCodes.Status200OK, "ok");
        }
    }
}
