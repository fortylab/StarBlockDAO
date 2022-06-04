"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NFTUtils = void 0;
exports.NFTUtils = [
    {
        inputs: [
            {
                internalType: "contract INFTMasterChef",
                name: "_nftMasterchef",
                type: "address"
            },
            {
                internalType: "uint256",
                name: "_pid",
                type: "uint256"
            },
            {
                internalType: "address",
                name: "_owner",
                type: "address"
            },
            {
                internalType: "uint256",
                name: "_fromTokenId",
                type: "uint256"
            },
            {
                internalType: "uint256",
                name: "_toTokenId",
                type: "uint256"
            }
        ],
        name: "getNFTMasterChefInfos",
        outputs: [
            {
                components: [
                    {
                        internalType: "contract IWrappedNFT",
                        name: "wnft",
                        type: "address"
                    },
                    {
                        internalType: "uint256",
                        name: "startBlock",
                        type: "uint256"
                    },
                    {
                        internalType: "uint256",
                        name: "currentRewardIndex",
                        type: "uint256"
                    },
                    {
                        internalType: "uint256",
                        name: "currentRewardEndBlock",
                        type: "uint256"
                    },
                    {
                        internalType: "uint256",
                        name: "amount",
                        type: "uint256"
                    },
                    {
                        internalType: "uint256",
                        name: "lastRewardBlock",
                        type: "uint256"
                    },
                    {
                        internalType: "uint256",
                        name: "accTokenPerShare",
                        type: "uint256"
                    },
                    {
                        internalType: "contract IERC20",
                        name: "dividendToken",
                        type: "address"
                    },
                    {
                        internalType: "uint256",
                        name: "accDividendPerShare",
                        type: "uint256"
                    },
                    {
                        internalType: "uint256",
                        name: "depositFee",
                        type: "uint256"
                    }
                ],
                internalType: "struct INFTMasterChef.PoolInfo",
                name: "_poolInfo",
                type: "tuple"
            },
            {
                components: [
                    {
                        internalType: "uint256",
                        name: "rewardBlock",
                        type: "uint256"
                    },
                    {
                        internalType: "uint256",
                        name: "rewardForEachBlock",
                        type: "uint256"
                    },
                    {
                        internalType: "uint256",
                        name: "rewardPerNFTForEachBlock",
                        type: "uint256"
                    }
                ],
                internalType: "struct INFTMasterChef.RewardInfo",
                name: "_rewardInfo",
                type: "tuple"
            },
            {
                components: [
                    {
                        internalType: "uint256",
                        name: "mining",
                        type: "uint256"
                    },
                    {
                        internalType: "uint256",
                        name: "dividend",
                        type: "uint256"
                    },
                    {
                        internalType: "uint256",
                        name: "nftQuantity",
                        type: "uint256"
                    },
                    {
                        internalType: "uint256",
                        name: "wnftQuantity",
                        type: "uint256"
                    },
                    {
                        internalType: "bool",
                        name: "isNFTApproved",
                        type: "bool"
                    },
                    {
                        internalType: "bool",
                        name: "isWNFTApproved",
                        type: "bool"
                    }
                ],
                internalType: "struct NFTUtils.UserInfo",
                name: "_userInfo",
                type: "tuple"
            },
            {
                internalType: "uint256",
                name: "_currentRewardIndex",
                type: "uint256"
            },
            {
                internalType: "uint256",
                name: "_endBlock",
                type: "uint256"
            },
            {
                internalType: "contract IERC721Metadata",
                name: "_nft",
                type: "address"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "contract IERC721Enumerable",
                name: "_nftEnumerable",
                type: "address"
            },
            {
                internalType: "address",
                name: "_owner",
                type: "address"
            }
        ],
        name: "ownedNFTEnumerableTokens",
        outputs: [
            {
                internalType: "uint256[]",
                name: "_totalTokenIds",
                type: "uint256[]"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "contract IERC721",
                name: "_nft",
                type: "address"
            },
            {
                internalType: "address",
                name: "_owner",
                type: "address"
            },
            {
                internalType: "uint256",
                name: "_fromTokenId",
                type: "uint256"
            },
            {
                internalType: "uint256",
                name: "_toTokenId",
                type: "uint256"
            }
        ],
        name: "ownedNFTNotEnumerableTokens",
        outputs: [
            {
                internalType: "uint256[]",
                name: "_totalTokenIds",
                type: "uint256[]"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "contract IERC721",
                name: "_nft",
                type: "address"
            },
            {
                internalType: "address",
                name: "_owner",
                type: "address"
            },
            {
                internalType: "uint256",
                name: "_fromTokenId",
                type: "uint256"
            },
            {
                internalType: "uint256",
                name: "_toTokenId",
                type: "uint256"
            }
        ],
        name: "ownedNFTTokens",
        outputs: [
            {
                internalType: "uint256[]",
                name: "_totalTokenIds",
                type: "uint256[]"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "contract IERC721",
                name: "_nft",
                type: "address"
            }
        ],
        name: "supportERC721",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "contract IERC721",
                name: "_nft",
                type: "address"
            }
        ],
        name: "supportERC721Enumerable",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "contract IERC721",
                name: "_nft",
                type: "address"
            }
        ],
        name: "supportERC721Metadata",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "contract IERC721",
                name: "_nft",
                type: "address"
            }
        ],
        name: "supportIWrappedNFT",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "contract IERC721",
                name: "_nft",
                type: "address"
            }
        ],
        name: "supportIWrappedNFTEnumerable",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool"
            }
        ],
        stateMutability: "view",
        type: "function"
    }
];
