import React from 'react';
import Swal from 'sweetalert2';
import useAuth from '../hooks/useAuth';
import useAxiosSecure from '../hooks/useAxiosSecure';

const AssetCard = ({ asset }) => {
  const { user } = useAuth()
  const axiosSecure = useAxiosSecure();
  const { productName, description, productType, quantity, image } = asset;

  const handleRequest = async (asset) => {
    // Prevent request if out of stock
    if (quantity <= 0) {
      Swal.fire({
        title: "Out of Stock",
        text: "This item is currently unavailable.",
        icon: "error"
      });
      return;
    }

    const { _id, productName, productType, companyName, hr } = asset;
    try {
      const requestData = {
        assetId: _id,
        productName,
        productType,
        requesterName: user.displayName,
        requesterEmail: user.email,
        requesterPhoto: user.photoURL,
        HrEmail: hr.email,
        companyName,
        requestDate: new Date(),
        approvalDate: null,
        requestStatus: 'Pending',
        note: '',
        processedBy: hr.email,
      }

      Swal.fire({
        title: "Confirm Request",
        text: `Do you want to request ${productName}?`,
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#2563eb", // blue-600
        cancelButtonColor: "#ef4444",  // red-500
        confirmButtonText: "Yes, Request it!",
        focusConfirm: false,
      }).then(async (result) => {
        if (result.isConfirmed) {
          await axiosSecure.post('/asset-requests', requestData);
          Swal.fire({
            title: "Request Sent!",
            text: "Your request has been submitted to HR for approval.",
            icon: "success",
            confirmButtonColor: "#2563eb"
          });
        }
      })
    } catch (error) {
      console.error("Error creating request data:", error);
      Swal.fire({
        title: "Error",
        text: "Something went wrong. Please try again.",
        icon: "error"
      });
    }
  };

  return (
    <div className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 overflow-hidden flex flex-col h-full">
      {/* Image Container */}
      <div className="relative h-56 overflow-hidden bg-slate-50">
        <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors z-10" />
        <img
          className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-110'
          src={image}
          alt={productName}
        />

        {/* Overlay Tags */}
        <div className="absolute top-3 right-3 z-20">
          <span className="px-3 py-1 text-xs font-bold text-white bg-black/60 backdrop-blur-md rounded-full uppercase tracking-wide border border-white/10">
            {productType}
          </span>
        </div>

        <div className="absolute top-3 left-3 z-20">
          {quantity > 0 ? (
            <span className="px-2.5 py-1 text-xs font-bold text-emerald-700 bg-emerald-100/90 backdrop-blur-md rounded-lg flex items-center gap-1.5 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              {quantity} Available
            </span>
          ) : (
            <span className="px-2.5 py-1 text-xs font-bold text-red-600 bg-red-100/90 backdrop-blur-md rounded-lg shadow-sm">
              Out of Stock
            </span>
          )}
        </div>
      </div>

      {/* Content Body */}
      <div className="p-5 flex-1 flex flex-col">
        <h2 className="text-lg font-bold text-slate-800 mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors">
          {productName}
        </h2>

        <p className="text-slate-500 text-sm mb-5 line-clamp-2 flex-1 leading-relaxed">
          {description}
        </p>

        {/* Action Footer */}
        <div className="mt-auto pt-4 border-t border-slate-100">
          <button
            onClick={() => handleRequest(asset)}
            disabled={quantity === 0}
            className={`w-full py-3 rounded-xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 transform active:scale-95
                    ${quantity > 0
                ? 'bg-slate-900 text-white hover:bg-slate-700 cursor-pointer shadow-md hover:shadow-blue-500/30'
                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }
                `}
          >
            {quantity > 0 ? (
              <>
                Request Asset
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </>
            ) : (
              'Unavailable'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssetCard;