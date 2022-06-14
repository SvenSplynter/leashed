using Core.Entities;
using Microsoft.AspNetCore.Http;

namespace Core.Interfaces
{
    public interface IPhotoService
    {
        Task<Photo> SaveToDiskAsync(IFormFile photo);
        void DeleteFromDisk(Photo photo);
        Task<ColorPhoto> SaveToDiskAsyncColor(IFormFile photo);
        void DeleteFromDiskColor(ColorPhoto photo);
    }
}