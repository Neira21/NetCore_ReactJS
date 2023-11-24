using backend.Context;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GestoresController : ControllerBase
    {
        private readonly AppDBContext _context;

        public GestoresController(AppDBContext context)
        {
            _context = context;
        }

        // GET: api/<GestoresController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<GestoresBD>>> GetGestores()
        {
            try
            {
                var gestores = await _context.gestores_basedatos.ToListAsync();
                return Ok(gestores);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // GET api/<GestoresController>/5
        [HttpGet("{id}", Name ="GetGestor")]
        public async Task<IActionResult> GetGestores(int id)
        {
            try
            {
                var gestores = await _context.gestores_basedatos.FindAsync(id);
                if (gestores != null)
                {
                    return Ok(gestores);
                }
                else
                {
                    return NotFound();
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // POST api/<GestoresController>
        [HttpPost]
        public async Task<IActionResult> PostGestores([FromBody] GestoresBD gestores)
        {
            try
            {
                _context.Add(gestores);
                await _context.SaveChangesAsync();
                return Ok(gestores);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // PUT api/<GestoresController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutGestores(int id, [FromBody] GestoresBD gestores)
        {
            try
            {
                if (id != gestores.id)
                {
                    return BadRequest();
                }
                else
                {
                    _context.Update(gestores);
                    await _context.SaveChangesAsync();
                    return Ok(new { message = "El gestor se actualizo con exito" });
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // DELETE api/<GestoresController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGestores(int id)
        {
            try
            {
                var gestores = await _context.gestores_basedatos.FindAsync(id);
                if (gestores != null)
                {
                    _context.gestores_basedatos.Remove(gestores);
                    await _context.SaveChangesAsync();
                    return Ok(new { message = "El gestor se elimino con exito" });
                }
                else
                {
                    return NotFound();
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        
    }
}
