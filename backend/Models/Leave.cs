using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using ELTBackend.Constants;

namespace ELTBackend.Models
{
    public class Leave : EntityBase
    {
        [Required]
        public DateTime CreatedAt { get; set; }

        [Required]
        public DateTime StartDate { get; set; }

        [Required]
        public DateTime EndDate { get; set; }

        [Required]
        [MaxLength(ValidationConstants.Leave.MaxStatusLength)]
        public string Status { get; set; } = String.Empty;

        [Required]
        public Guid UserId { get; set; }

        // Navigation property
        [ForeignKey("UserId")]
        public User User { get; set; } = null!;
    }
}
