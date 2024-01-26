using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities
{
    public class Usuario
    {

        public int Id { get; set; }

        public string? Nombres { get; set; }

        public Rol? Rol { get; set; }

        public string? Username { get; set; }

    }
}
