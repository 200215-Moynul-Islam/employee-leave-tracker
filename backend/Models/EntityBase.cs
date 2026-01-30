using System.ComponentModel.DataAnnotations;

namespace ELTBackend.Models
{
    public abstract class EntityBase
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public bool IsDeleted { get; set; } = false;
    }
}