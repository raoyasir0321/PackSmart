import React from "react";

const ProductAdditionalInformation = ({ productInfo, selectedVariant , isMobileScreen }) => {
  let productDetails;

  if (
    productInfo?.variant_combo_reference &&
    Object.values(productInfo?.variant_combo_reference)?.length > 0
  ) {
    const matchedVariantKey = Object.keys(
      productInfo?.variant_combo_reference
    ).find((key) => key === selectedVariant.join(","));

    const matchedVariant =
      productInfo?.variant_combo_reference[matchedVariantKey];
    const variantComboId = matchedVariant?.variant_combo_id;
    productDetails =
      productInfo?.product_details &&
      productInfo?.product_details[variantComboId];
  } else {
    productDetails = productInfo?.product_details[0];
  }

  let parsedDetails = {};
  if (productDetails?.details) {
    try {
      parsedDetails = JSON.parse(productDetails.details);
    } catch (error) {
      console.error("Error parsing details:", error);
    }
  }

  return (
    <>
      {productInfo?.product_details &&
      Object.values(productInfo?.product_details)?.length > 0 ? (
        <>
          <div className="tab-pane fade active show">
            <div className={`row ${isMobileScreen ? 'mt-0' : 'mt-3'}`}>
              <div className="col-xl-12 col-lg-12 col-md-12 ">
                <table className="table table-striped">
                  <tbody>
                    {Object.entries(productDetails).map(([key, value]) => {
                      if (key !== "details") {
                        return (
                          <tr key={`${key} tr`}>
                            <th>{key}</th>
                            <td style={{wordBreak: 'break-word' , color: '#959595'}}>{value}</td>
                          </tr>
                        );
                      }
                      return null;
                    })}
                    {parsedDetails && (
                      <>
                        {Object.entries(parsedDetails).map(([key, value]) => (
                          <tr key={`${key} tr`}>
                            <th>{key}</th>
                            <td style={{wordBreak: 'break-word' , color: '#959595'}}>{value}</td>
                          </tr>
                        ))}
                      </>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="d-flex align-items-center justify-content-center" style={{marginTop: "10px"}}>
          <p className="reviewTextStyle">
            No Additional Information
          </p>
        </div>
      )}
    </>
  );
};

export default ProductAdditionalInformation;
