using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities
{
    public class Factura
    {
        public int Id { get; set; }

        public string? NombreCliente { get; set; }

        public string? Fecha { get; set; }

        public Detalle[]? Detalles { get; set; }

        public string? Transaccion { get; set; }

    }
}
