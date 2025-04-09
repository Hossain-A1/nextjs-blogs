const AddBlog = ({
  formData,
  setFormData,
  handleSubmit,
  handleUpdateBlog,
  isUpId,
}) => {
  // handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className='bg-white rounded-xl shadow p-4 w-full h-full overflow-y-auto'>
      <h2 className='text-2xl font-semibold mb-4 text-violet-600'>
        Create New Blog
      </h2>
      <form
        onSubmit={isUpId ? handleUpdateBlog : handleSubmit}
        className='space-y-4'
      >
        {/* Title */}
        <div>
          <label className='block text-gray-700 font-medium mb-1'>Title</label>
          <input
            type='text'
            name='title'
            value={formData.title}
            onChange={handleChange}
            placeholder='Enter blog title'
            className='w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-violet-400'
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className='block text-gray-700 font-medium mb-1'>
            Description
          </label>
          <textarea
            name='description'
            value={formData.description}
            onChange={handleChange}
            placeholder='Write a short description...'
            rows='4'
            className='w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-violet-400'
            required
          ></textarea>
        </div>

        {/* Image upload */}
        <div>
          <label className='block text-gray-700 font-medium mb-1'>Image</label>
          <input
            type='text'
            name='image'
            value={formData.image}
            onChange={handleChange}
            className='w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-violet-400'
            required
          />
        </div>

        {/* Submit button */}
        {isUpId ? (
          <button
            type='submit'
            className='bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded shadow'
          >
            Update Blog
          </button>
        ) : (
          <button
            type='submit'
            className='bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded shadow'
          >
            Submit Blog
          </button>
        )}
      </form>
    </div>
  );
};

export default AddBlog;
