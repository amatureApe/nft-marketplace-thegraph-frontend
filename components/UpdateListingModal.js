import { Modal, Input } from "web3uikit";

export default function UpdateListingModal({ nftAddress, tokenId }) {
  let isVisible;
  return (
    <Modal
      isVisible={isVisible}
    >
      <Input
        label="Update listing price in ETH"
        name="New listing price"
        type="number"
      />

    </Modal >
  )
}