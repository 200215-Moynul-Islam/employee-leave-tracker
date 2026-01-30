using AutoMapper;
using ELTBackend.DTOs;
using ELTBackend.Models;

namespace ELTBackend.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            #region User Mappings
            CreateMap<UserCreateDto, User>();
            CreateMap<User, UserReadDto>();
            #endregion
        }
    }
}
