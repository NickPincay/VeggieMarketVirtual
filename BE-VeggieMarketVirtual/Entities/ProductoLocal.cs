using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities
{
    public class ProductoLocal
    {
        public int Id { get; set; }

        public string? Nombre { get; set; }

        public Categoria? Categoria { get; set; }

        public decimal Precio { get; set; }

        public int Cantidad { get; set; }

        public string? ImagenName { get; set; }

        public string? Descripcion { get; set; }

        public string? NombreAgricultor { get; set; }

        public DateTime Cosecha { get; set; }

        public int Descuento { get; set; }

        public string? Transaccion { get; set; }
    }
}
