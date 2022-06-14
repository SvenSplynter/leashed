using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Http;

namespace Infrastructure.Services
{
    public class PhotoService : IPhotoService
    {
        public async Task<Photo> SaveToDiskAsync(IFormFile file)
        {
            var photo = new Photo();
            if (file.Length > 0) {
                var fileName = Guid.NewGuid() + Path.GetExtension(file.FileName);
                var filePath = Path.Combine("wwwroot/images", fileName);
                await using var fileStream = new FileStream(filePath, FileMode.Create);
                await file.CopyToAsync(fileStream);

                photo.FileName = fileName;
                photo.PictureUrl = "images/" + fileName;

                return photo;
            }

            return null;
        }

        public void DeleteFromDisk(Photo photo)
        {
            if (File.Exists(Path.Combine("wwwroot/images", photo.FileName)))
            {
                File.Delete("wwwroot/images/" + photo.FileName);
            }
        }
        public async Task<ColorPhoto> SaveToDiskAsyncColor(IFormFile file)
        {
            var photo = new ColorPhoto();
            if (file.Length > 0) {
                var fileName = Guid.NewGuid() + Path.GetExtension(file.FileName);
                var filePath = Path.Combine("wwwroot/images/colors", fileName);
                await using var fileStream = new FileStream(filePath, FileMode.Create);
                await file.CopyToAsync(fileStream);

                photo.FileName = fileName;
                photo.PictureUrl = "images/colors/" + fileName;

                return photo;
            }

            return null;
        }

        public void DeleteFromDiskColor(ColorPhoto photo)
        {
            if (File.Exists(Path.Combine("wwwroot/images/colors", photo.FileName)))
            {
                File.Delete("wwwroot/images/colors/" + photo.FileName);
            }
        }
    }
}