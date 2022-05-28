"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NFTMasterChef = void 0;
exports.NFTMasterChef = [
    {
        inputs: [
            {
                internalType: "contract IWrappedNFTFactory",
                name: "_wnftFactory",
                type: "address"
            },
            {
                internalType: "contract IERC20",
                name: "_token",
                type: "address"
            },
            {
                internalType: "address payable",
                name: "_devAddress",
                type: "address"
            }
        ],
        stateMutability: "nonpayable",
        type: "constructor"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint256",
                name: "_pid",
                type: "uint256"
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "_addDividend",
                type: "uint256"
            }
        ],
        name: "AddDividendForPool",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "contract IERC721Metadata",
                name: "nft",
                type: "address"
            },
            {
                indexed: false,
                internalType: "contract IWrappedNFT",
                name: "wnft",
                type: "address"
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "startBlock",
                type: "uint256"
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
                indexed: false,
                internalType: "struct INFTMasterChef.RewardInfo[]",
                name: "_rewards",
                type: "tuple[]"
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "depositFee",
                type: "uint256"
            },
            {
                indexed: false,
                internalType: "contract IERC20",
                name: "_dividendToken",
                type: "address"
            },
            {
                indexed: false,
                internalType: "bool",
                name: "withUpdate",
                type: "bool"
            }
        ],
        name: "AddPoolInfo",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint256",
                name: "pid",
                type: "uint256"
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "addTokenPerPool",
                type: "uint256"
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "addTokenPerBlock",
                type: "uint256"
            },
            {
                indexed: false,
                internalType: "bool",
                name: "withTokenTransfer",
                type: "bool"
            }
        ],
        name: "AddTokenRewardForPool",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint256",
                name: "pid",
                type: "uint256"
            },
            {
                indexed: false,
                internalType: "address payable",
                name: "to",
                type: "address"
            }
        ],
        name: "ClosePool",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "user",
                type: "address"
            },
            {
                indexed: true,
                internalType: "uint256",
                name: "pid",
                type: "uint256"
            },
            {
                indexed: false,
                internalType: "uint256[]",
                name: "tokenIds",
                type: "uint256[]"
            }
        ],
        name: "Deposit",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "user",
                type: "address"
            },
            {
                indexed: false,
                internalType: "address",
                name: "to",
                type: "address"
            }
        ],
        name: "EmergencyStop",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "user",
                type: "address"
            },
            {
                indexed: true,
                internalType: "uint256",
                name: "pid",
                type: "uint256"
            },
            {
                indexed: false,
                internalType: "uint256[]",
                name: "_wnftTokenIds",
                type: "uint256[]"
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "mining",
                type: "uint256"
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "dividend",
                type: "uint256"
            }
        ],
        name: "Harvest",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "previousOwner",
                type: "address"
            },
            {
                indexed: true,
                internalType: "address",
                name: "newOwner",
                type: "address"
            }
        ],
        name: "OwnershipTransferred",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "contract IHarvestStrategy",
                name: "harvestStrategy",
                type: "address"
            },
            {
                indexed: false,
                internalType: "bool",
                name: "withUpdate",
                type: "bool"
            }
        ],
        name: "SetHarvestStrategy",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint256",
                name: "pid",
                type: "uint256"
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "depositFee",
                type: "uint256"
            },
            {
                indexed: false,
                internalType: "bool",
                name: "withUpdate",
                type: "bool"
            }
        ],
        name: "SetPoolDepositFee",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint256",
                name: "pid",
                type: "uint256"
            },
            {
                indexed: false,
                internalType: "contract IERC20",
                name: "dividendToken",
                type: "address"
            },
            {
                indexed: false,
                internalType: "bool",
                name: "withUpdate",
                type: "bool"
            }
        ],
        name: "SetPoolDividendToken",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint256",
                name: "pid",
                type: "uint256"
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "startBlock",
                type: "uint256"
            },
            {
                indexed: false,
                internalType: "bool",
                name: "withUpdate",
                type: "bool"
            }
        ],
        name: "SetStartBlock",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address payable",
                name: "devAddress",
                type: "address"
            }
        ],
        name: "UpdateDevAddress",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "user",
                type: "address"
            },
            {
                indexed: true,
                internalType: "uint256",
                name: "pid",
                type: "uint256"
            },
            {
                indexed: false,
                internalType: "uint256[]",
                name: "wnfTokenIds",
                type: "uint256[]"
            }
        ],
        name: "Withdraw",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "user",
                type: "address"
            },
            {
                indexed: true,
                internalType: "uint256",
                name: "pid",
                type: "uint256"
            },
            {
                indexed: false,
                internalType: "uint256[]",
                name: "wnfTokenIds",
                type: "uint256[]"
            }
        ],
        name: "WithdrawWithoutHarvest",
        type: "event"
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_pid",
                type: "uint256"
            },
            {
                internalType: "uint256",
                name: "_addDividend",
                type: "uint256"
            }
        ],
        name: "addDividendForPool",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "contract IERC721Metadata",
                name: "_nft",
                type: "address"
            },
            {
                internalType: "uint256",
                name: "_startBlock",
                type: "uint256"
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
                internalType: "struct INFTMasterChef.RewardInfo[]",
                name: "_rewards",
                type: "tuple[]"
            },
            {
                internalType: "uint256",
                name: "_depositFee",
                type: "uint256"
            },
            {
                internalType: "contract IERC20",
                name: "_dividendToken",
                type: "address"
            },
            {
                internalType: "bool",
                name: "_withUpdate",
                type: "bool"
            }
        ],
        name: "addPoolInfo",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_pid",
                type: "uint256"
            },
            {
                internalType: "address",
                name: "_to",
                type: "address"
            },
            {
                internalType: "uint256[]",
                name: "_wnftTokenIds",
                type: "uint256[]"
            }
        ],
        name: "canHarvest",
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
                internalType: "uint256",
                name: "_pid",
                type: "uint256"
            },
            {
                internalType: "address payable",
                name: "_to",
                type: "address"
            }
        ],
        name: "closePool",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_pid",
                type: "uint256"
            },
            {
                internalType: "uint256[]",
                name: "_tokenIds",
                type: "uint256[]"
            }
        ],
        name: "deposit",
        outputs: [],
        stateMutability: "payable",
        type: "function"
    },
    {
        inputs: [],
        name: "devAddress",
        outputs: [
            {
                internalType: "address payable",
                name: "",
                type: "address"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address payable",
                name: "_to",
                type: "address"
            }
        ],
        name: "emergencyStop",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_from",
                type: "uint256"
            },
            {
                internalType: "uint256",
                name: "_to",
                type: "uint256"
            }
        ],
        name: "getMultiplier",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256"
            }
        ],
        stateMutability: "pure",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_pid",
                type: "uint256"
            }
        ],
        name: "getPoolEndBlock",
        outputs: [
            {
                internalType: "uint256",
                name: "_poolEndBlock",
                type: "uint256"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_pid",
                type: "uint256"
            },
            {
                internalType: "address",
                name: "_to",
                type: "address"
            },
            {
                internalType: "uint256[]",
                name: "_wnftTokenIds",
                type: "uint256[]"
            }
        ],
        name: "harvest",
        outputs: [
            {
                internalType: "uint256",
                name: "_mining",
                type: "uint256"
            },
            {
                internalType: "uint256",
                name: "_dividend",
                type: "uint256"
            }
        ],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [],
        name: "harvestStrategy",
        outputs: [
            {
                internalType: "contract IHarvestStrategy",
                name: "",
                type: "address"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_pid",
                type: "uint256"
            }
        ],
        name: "isPoolEnd",
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
        inputs: [],
        name: "massUpdatePools",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [],
        name: "owner",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_pid",
                type: "uint256"
            },
            {
                internalType: "uint256[]",
                name: "_wnftTokenIds",
                type: "uint256[]"
            }
        ],
        name: "pending",
        outputs: [
            {
                internalType: "uint256",
                name: "_mining",
                type: "uint256"
            },
            {
                internalType: "uint256",
                name: "_dividend",
                type: "uint256"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256"
            }
        ],
        name: "poolInfos",
        outputs: [
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
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [],
        name: "poolLength",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256"
            },
            {
                internalType: "uint256",
                name: "",
                type: "uint256"
            }
        ],
        name: "poolNFTInfos",
        outputs: [
            {
                internalType: "bool",
                name: "deposited",
                type: "bool"
            },
            {
                internalType: "uint256",
                name: "rewardDebt",
                type: "uint256"
            },
            {
                internalType: "uint256",
                name: "dividendDebt",
                type: "uint256"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_pid",
                type: "uint256"
            }
        ],
        name: "poolRewardLength",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256"
            },
            {
                internalType: "uint256",
                name: "",
                type: "uint256"
            }
        ],
        name: "poolsRewardInfos",
        outputs: [
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
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [],
        name: "renounceOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_depositFee",
                type: "uint256"
            },
            {
                internalType: "bool",
                name: "_withUpdate",
                type: "bool"
            }
        ],
        name: "setAllPoolDepositFee",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "contract IHarvestStrategy",
                name: "_harvestStrategy",
                type: "address"
            },
            {
                internalType: "bool",
                name: "_withUpdate",
                type: "bool"
            }
        ],
        name: "setHarvestStrategy",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_pid",
                type: "uint256"
            },
            {
                internalType: "uint256",
                name: "_depositFee",
                type: "uint256"
            },
            {
                internalType: "bool",
                name: "_withUpdate",
                type: "bool"
            }
        ],
        name: "setPoolDepositFee",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_pid",
                type: "uint256"
            },
            {
                internalType: "contract IERC20",
                name: "_dividendToken",
                type: "address"
            },
            {
                internalType: "bool",
                name: "_withUpdate",
                type: "bool"
            }
        ],
        name: "setPoolDividendToken",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_pid",
                type: "uint256"
            },
            {
                internalType: "uint256",
                name: "_startBlock",
                type: "uint256"
            },
            {
                internalType: "bool",
                name: "_withUpdate",
                type: "bool"
            }
        ],
        name: "setStartBlock",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [],
        name: "token",
        outputs: [
            {
                internalType: "contract IERC20",
                name: "",
                type: "address"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "newOwner",
                type: "address"
            }
        ],
        name: "transferOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address payable",
                name: "_devAddress",
                type: "address"
            }
        ],
        name: "updateDevAddress",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_pid",
                type: "uint256"
            }
        ],
        name: "updatePool",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_pid",
                type: "uint256"
            },
            {
                internalType: "uint256[]",
                name: "_wnftTokenIds",
                type: "uint256[]"
            }
        ],
        name: "withdraw",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_pid",
                type: "uint256"
            },
            {
                internalType: "uint256[]",
                name: "_wnftTokenIds",
                type: "uint256[]"
            }
        ],
        name: "withdrawWithoutHarvest",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [],
        name: "wnftFactory",
        outputs: [
            {
                internalType: "contract IWrappedNFTFactory",
                name: "",
                type: "address"
            }
        ],
        stateMutability: "view",
        type: "function"
    }
];
