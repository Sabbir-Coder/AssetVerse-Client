import React from 'react';
import Swal from 'sweetalert2';
import useAuth from '../hooks/useAuth';

const AssetCard = ({ asset }) => {
  const { user } = useAuth()
  console.log(asset);
  const { productName, description, productType, quantity, image } = asset;


  const handleRequest = (asset) => {
    const { _id, productName, description, productType, companyName, hr } = asset;
    try {
      const requestData = {
        assetId: _id,
        productName,
        description,
        productType,
        requesterEmail: user.email,
        HrEmail: hr.email,
        companyName,
        requestDate: new Date(),
        approvalDate: null,
        requestStatus: 'Pending',
        note: '',
        processedBy: '',
      }
      console.log(requestData);
    } catch (error) {
      console.error("Error creating request data:", error);
    }
    // Handle asset request logic here
    Swal.fire({
      title: "Are you sure?",
      text: "Want to send this request?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, send it!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Sent!",
          text: "Your request has been sent. Wait For Approval",
          icon: "success"
        });
      }
    });
  }

  return (
    <div className="card  max-h-110 bg-white shadow-sm">
      <figure className='p-4 bg-gray-300'>
        <img className='w-full'
          src={image}
          alt={productName} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {productName}
        </h2>
        <p>{description}</p>
        <div className="badge badge-secondary">NEW</div>
        <div className="card-actions">
          <div className="badge badge-outline">{productType}</div>
          <div className="badge badge-outline">Available: {quantity}</div>
        </div>
      </div>
      <button onClick={() => handleRequest(asset)} className="btn btn-primary">Request</button>
    </div>
  );
};

export default AssetCard;