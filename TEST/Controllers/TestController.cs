using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TEST.Models;

namespace TEST.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestController : ControllerBase
    {
        private readonly TestContext _context;

        public TestController(TestContext context)
        {
            _context = context;
        }


        [HttpGet]
        [Route("Listar")]
        public async Task<IActionResult> Listar()
        {
            List<Test> tests = await _context.Tests.ToListAsync();
            return Ok(tests);
        }

        [HttpPost]
        [Route("Crear")]
        public async Task<IActionResult> Crear(Test test)
        {
            _context.Add(test);
            await _context.SaveChangesAsync();
            return Ok(test);
        }

        [HttpPut]
        [Route("Editar")]
        public async Task<IActionResult> Editar(Test test)
        {
            _context.Entry(test).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return Ok(test);
        }

        [HttpDelete]
        [Route("Eliminar/{id}")]
        public async Task<IActionResult> Eliminar(int id)
        {
            Test test = await _context.Tests.FindAsync(id);
            _context.Tests.Remove(test);
            await _context.SaveChangesAsync();
            return Ok(test);
        }
        
        [HttpGet]
        [Route("Buscar/{id}")]
        public async Task<IActionResult> Buscar(int id)
        {
            Test test = await _context.Tests.FindAsync(id);
            return Ok(test);
        }

        

    }
}
