import React from "react";

export default function ProductsForm({
  data,
  onChange,
  onSubmit,
  isInEditMode,
}) {
  return (
    <>
      <div className="form-group mb-3">
        <label>Title</label>
        <input
          type="text"
          name="title"
          value={data?.title}
          onChange={onChange}
          className="form-control"
        />
      </div>
      <div className="form-group mb-3">
        <label>Description</label>
        <input
          type="text"
          name="description"
          value={data?.description}
          onChange={onChange}
          className="form-control"
        />
      </div>
      <div className="form-group mb-3">
        <label>Price</label>
        <input
          type="number"
          name="price"
          value={data?.price}
          onChange={onChange}
          className="form-control"
        />
      </div>
      <div className="form-group mb-3">
        <label>Quantity</label>
        <input
          type="number"
          name="quantity"
          value={data?.quantity}
          onChange={onChange}
          className="form-control"
        />
      </div>
      <div className="form-group mb-3">
        <label>Category</label>
        <input
          type="text"
          name="category"
          value={data?.category}
          onChange={onChange}
          className="form-control"
        />
      </div>
      <button
        className="btn btn-dark mt-3"
        disabled={Object.values(data).some((el) => el.length == 0)}
        onClick={onSubmit}
      >
        {isInEditMode ? "Update" : "Create"}
      </button>
    </>
  );
}
