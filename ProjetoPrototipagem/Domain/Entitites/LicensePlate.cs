using ProjetoPrototipagem.Domain.Entitites.Common;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProjetoPrototipagem.Domain.Entitites
{
    public class LicensePlate : Base
    {
        [ForeignKey(nameof(Owner))]
        public int OwnerId { get; set; }
        public Driver Driver { get; set; }
        public string Number { get; set; }

        public virtual Owner Owner {get;set;}
    }
}
