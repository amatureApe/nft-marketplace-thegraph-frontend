import { useState, useEffect } from "react";
import { useWeb3Contract, useMoralis } from "react-moralis";
import NftMarketplaceAbi from "../constants/NftMarketplace.json";
import nftAbi from "../constants/BasicNft.json";
import Image from "next/image";

export default function NFTBox({ price, nftAddress, tokenId, marketplaceAddress, seller }) {
  const { isWeb3Enabled } = useMoralis();
  const [imageURI, setImageURI] = useState("");

  const { runContractFunction: getTokenURI } = useWeb3Contract({
    abi: nftAbi,
    contractAddress: nftAddress,
    functionName: "tokenURI",
    params: {
      tokenId: tokenId,
    },
  })

  async function updateUI() {
    const tokenURI = await getTokenURI();
    console.log(`The TokenURI is ${tokenURI}`);
    if (tokenURI) {
      const requestURL = tokenURI.replace("ipfs://", "https://ipfs.io/ipfs/")
      const tokenURIResponse = await (await fetch(requestURL)).json();
      const imageURI = tokenURIResponse.image;
      const imageURIURL = imageURI.replace("ipfs://", "https://ipfs.io/ipfs");
      setImageURI(imageURIURL);

    }
  }

  useEffect(() => {
    if (isWeb3Enabled) {
      updateUI()
    }
  }, [isWeb3Enabled])

  return (
    <div>
      <div>
        {imageURI ? <Image
          loader={() => imageURI}
          src={imageURI}
          height="200"
          width="200"
        /> : (<div>Loading...</div>)}
      </div>
    </div>
  )
}