using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities
{
    public class ProductoComunidad
    {
        public int Id { get; set; }

        public string? Nombre { get; set; }

        public decimal Precio { get; set; }

        public int Cantidad { get; set; }

        public string? ImagenName { get; set; }

        public string? Descripcion { get; set; }

        public DateTime Cosecha { get; set; }

        public string? Transaccion { get; set; }
    }
}
