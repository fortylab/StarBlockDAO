
import * as Web3 from "web3";
// import { DaoPort } from "./starblockdao-js/daoport";
import { DaoPort } from "./starblockdao-js/lib/daoport";
// import { Network } from "./starblockdao-js/types";

import { Network } from "./starblockdao-js/lib/types";
import { getRequestBaseUrl, getProdcutMode } from "@/common/starBlockConfig";
import Web3Modal from "web3modal";
import { providerOptions } from "@/common/web3Config";
import { getLocalStorage } from "./utils";
var utils = require('web3-utils')
var iuputAccountAddress = null;
var network_Name = getProdcutMode() == 1 ? Network.Main : Network.Rinkeby;
var chain_Id = getProdcutMode() == 1 ? 1 : 4;

var accounts;
var daoport;
var web3;

export function setNetwork_Name(chaiIdNum) {
    // chain_Id = chaiIdNum;
    if (chaiIdNum === 1) {
        network_Name = Network.Main;
        // isEther = true;
    }

    if (chaiIdNum === 4) {
        network_Name = Network.Rinkeby;
        // isEther = true;
    }
    // if (chaiIdNum === 56) {
    //     network_Name = Network.BSC_Main;
    //     isEther = false;
    // }
    // if (chaiIdNum === 97) {
    //     network_Name = Network.BSC_Test;
    //     isEther = false;
    // }
    // alert(network_Name);
}
export function initWeb3() {

    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        // 请求用户授权
        // window.ethereum.enable();
    } else if (typeof web3 !== "undefined") {
        web3 = new Web3(web3.currentProvider);
        // web3.eth.defaultAccount = web3.eth.accounts[0];
        // console.log(web3.eth.defaultAccount);
    } else {
        // set the provider you want from Web3.providers
        // web3 = new Web3(new Web3.providers.HttpProvider("http://192.168.1.61:8080"));
        var PROVIDER_URL = "";
        if (getProdcutMode() == 1) {
            PROVIDER_URL = "https://mainnet.infura.io/v3/7581b5aab9b4489ba1517a3e06e84280"
        } else {
            PROVIDER_URL = "https://rinkeby.infura.io/v3/7581b5aab9b4489ba1517a3e06e84280";
        }
        web3 = new Web3(new Web3.providers.HttpProvider(PROVIDER_URL));
    }
    return web3;


}


export function initReadWeb3() {


    // set the provider you want from Web3.providers
    // web3 = new Web3(new Web3.providers.HttpProvider("http://192.168.1.61:8080"));
    var PROVIDER_URL = "";
    if (getProdcutMode() == 1) {
        PROVIDER_URL = "https://mainnet.infura.io/v3/77d797bda3d74dc383299bb53c301e1e"
    } else {
        PROVIDER_URL = "https://rinkeby.infura.io/v3/7581b5aab9b4489ba1517a3e06e84280";
    }
    var readWeb3 = new Web3(new Web3.providers.HttpProvider(PROVIDER_URL));

    return readWeb3;

}


export async function getPoolSta(handlePoolSta, isFirstLoad) {
    if (!accounts) {
        await getAccounts();
    }
    if (!daoport) {
        getDaoPort(accounts[0]);
    }

    const user = accounts[0];
    const withOwnedNFTTokenIds = true;
    const parameters = {
        user,
        withOwnedNFTTokenIds
    };
    const poolStaInfos = await daoport.getPoolSta(parameters);
    console.log("getPoolSta:::wrappedPoolInfos,userInfo,poolSta", poolStaInfos.wrappedPoolInfos, poolStaInfos.userInfo, poolStaInfos.poolSta);
    if (handlePoolSta) {
        handlePoolSta(poolStaInfos, isFirstLoad);
    }

}

export async function getAllPoolInfos(handlePoolInfos, canDeposite, deposited) {
    if (!accounts) {
        await getAccounts();
    }
    if (!daoport) {
        getDaoPort(accounts[0]);
    }

    const user = accounts[0];
    const parameters = {
        user,
        canDeposite,
        deposited
    };
    const poolInfos = await daoport.getAllPoolInfos(parameters);
    console.log("poolInfos", poolInfos);
    if (handlePoolInfos) {
        handlePoolInfos(poolInfos);
    }
}

export async function ownedWNFTsTokenIdsByPids(pids, handleWNFTsTokenIds) {
    if (!accounts) {
        await getAccounts();
    }
    if (!daoport) {
        getDaoPort(accounts[0]);
    }

    const user = accounts[0];
    const parameters = {
        pids,
        user,
    };
    var WNFTsTokenIds = await daoport.ownedWNFTsTokenIdsByPids(parameters);
    var newArr = [];
    var newPidsArr = [];
    for (var i = 0; i < WNFTsTokenIds.length; i++) {
        const item = WNFTsTokenIds[i];
        const pid = pids[i];
        if (item.length > 0) {
            newArr.push(item);
            newPidsArr.push(pid);
        }
    }

    console.log("WNFTsTokenIds", WNFTsTokenIds);
    console.log("newArr", newArr);
    console.log("newPidsArr", newPidsArr);
    if (handleWNFTsTokenIds) {
        handleWNFTsTokenIds(newArr, newPidsArr);
    }
}

export async function harvestAllByWNFTTokenIds(poolWNFTTokenIds, pids, handleHarvestAll, requesUploadHash, faildHandle) {
    if (!accounts) {
        await getAccounts();
    }
    if (!daoport) {
        getDaoPort(accounts[0]);
    }

    const forUser = accounts[0];
    await daoport.harvestAllByWNFTTokenIds(
        forUser,
        pids,
        poolWNFTTokenIds,
        txHash => {
            if (requesUploadHash) {
                requesUploadHash(txHash)
            }
            console.log("handleHarvestAll on:::", txHash);
        },
        res => {
            if (handleHarvestAll) {
                handleHarvestAll(res);
            }
            console.log("handleHarvestAll then:::", res);
        },
        err => {

            var reg = RegExp(/Transaction was not mined within/);
            if (err.message.match(reg)) {

            } else {
                if (faildHandle) {
                    faildHandle()
                }
            }
            console.log("handleHarvestAll catch:::", err);
        }
    );
    // const info = await daoport.harvestAllByWNFTTokenIds(parameters);
    // console.log("harvestAllByWNFTTokenIds", info);
    // if (handleHarvestAll) {
    //     handleHarvestAll();
    // }
}

export async function getPoolInfosByNFTorWNFTs(contractAddress, handleSearch) {
    if (!accounts) {
        await getAccounts();
    }
    if (!daoport) {
        getDaoPort(accounts[0]);
    }


    try {
        const user = accounts[0];
        // const withOwnedNFTTokenIds = false;
        const nftOrWNFTs = [contractAddress]
        const parameters = {
            nftOrWNFTs,
            user,
            // withOwnedNFTTokenIds
        };

        const poolInfos = await daoport.getPoolInfosByNFTorWNFTs(parameters);
        console.log("poolInfos", poolInfos);

        if (handleSearch) {
            handleSearch(poolInfos);
        }
    } catch (error) {
        console.log(error);
    }
}

export async function daoportAction(item, handleMasterChefInfo, index, isFirstLoad) {

    if (!accounts) {
        await getAccounts();
    }
    // alert(accounts[0])
    if (!daoport) {
        getDaoPort(accounts[0]);
    }
    // const owner = accounts[0];
    const pid = item.poolInfo.pid;
    var owner = accounts[0];
    // const maxTokenId = item.poolInfo.maxTokenId;
    const rangeTokenIds = item.poolInfo.rangeTokenIds;
    var parameters = {
        pid,
        owner,
        rangeTokenIds
    };
    const masterChefInfo = await daoport.getNFTMasterChefInfos(parameters);
    // alert(masterChefInfo);

    // console.log("document=== masterchefinfo: pid", pid, masterChefInfo);
    if (handleMasterChefInfo) {
        handleMasterChefInfo(masterChefInfo, item, index, isFirstLoad);
    }
}

export async function approveNFTAction(item, getIsApproveNFT, index, isOnlyGetApprove, faildHandle, requesUploadHash) {
    if (!accounts) {
        await getAccounts();
    }

    if (!daoport) {
        getDaoPort(accounts[0]);
    }
    const owner = accounts[0];
    const wnftContract = item.poolInfo.wnft;
    const nftContract = item.nft;
    const isApproveNFT = true;
    let parameters = {
        owner,
        nftContract,
        wnftContract,
        isApproveNFT
    };
    // const isApprove = await daoport.isApprovedForAll(parameters);
    // console.log("daoporApprovedtAction==", isApprove);
    if (isOnlyGetApprove) {
        if (getIsApproveNFT) {
            getIsApproveNFT(isApprove, item, index);
        }
        return;
    }

    await daoport.setApprovalForAll(
        owner,
        nftContract,
        wnftContract,
        isApproveNFT,
        txHash => {
            if (requesUploadHash) {
                requesUploadHash(txHash)
            }
            console.log("daoporApprovedtAction on:::", txHash);
        },
        res => {
            // if (successHandle) {
            //     successHandle(res);
            // }
            if (getIsApproveNFT) {
                getIsApproveNFT(true, item, index, res);
            }
            console.log("daoporApprovedtAction then:::", res);
        },
        err => {

            var reg = RegExp(/Transaction was not mined within/);
            if (err.message.match(reg)) {

            } else {
                if (faildHandle) {
                    faildHandle(item)
                }
            }
            // if (faildHandle) {
            //     faildHandle(err);
            // }
            console.log("daoporApprovedtAction catch:::", err);
        }
    );

    // try {
    //     const txHash = await daoport.setApprovalForAll(parameters);
    //     console.log("daoporApprovedtAction --txHash", txHash);
    //     if (getIsApproveNFT) {
    //         getIsApproveNFT(true, item, index);
    //     }
    // } catch (error) {
    //     var reg = RegExp(/Transaction was not mined within/);
    //     if (error.message.match(reg)) {

    //     } else {
    //         if (faildHandle) {
    //             faildHandle(item)
    //         }
    //     }
    // }
}


export async function approveWNFTAction(item, getIsApproveNFT, index, isOnlyGetApprove, faildHandle, requesUploadHash) {
    if (!accounts) {
        await getAccounts();
    }

    if (!daoport) {
        getDaoPort(accounts[0]);
    }
    const owner = accounts[0];
    // var operator = "0x5B78867B0ecC41170e6A1A8A418B8dC1890b0F18";
    const wnftContract = item.poolInfo.wnft;
    const isApproveNFT = false;
    // if (!isApproveNFT) {
    //解抵押授权
    // nftMasterchef 合约
    // operator = "0x5B78867B0ecC41170e6A1A8A418B8dC1890b0F18";
    // }
    // let parameters = {
    //     owner,
    //     wnftContract,
    //     isApproveNFT
    // };


    // const isApprove = await daoport.isApprovedForAll(parameters);
    // console.log("daoporApprovedtAction==", isApprove);

    // if (isOnlyGetApprove) {
    //     if (getIsApproveNFT) {
    //         getIsApproveNFT(isApprove, item, index);
    //     }
    //     return;
    // }
    var nftContract = "";

    await daoport.setApprovalForAll(
        owner,
        nftContract,
        wnftContract,
        isApproveNFT,
        txHash => {
            if (requesUploadHash) {
                requesUploadHash(txHash)
            }
            console.log("daoporApprovedtAction on:::", txHash);
        },
        res => {

            if (getIsApproveNFT) {
                getIsApproveNFT(true, item, index, res);
            }

            console.log("daoporApprovedtAction then:::", res);
        },
        err => {
            var reg = RegExp(/Transaction was not mined within/);
            if (err.message.match(reg)) {
            } else {
                if (faildHandle) {
                    faildHandle(item)
                }
            }
            console.log("daoporApprovedtAction catch:::", err);
        }
    );

    // try {
    //     const txHash = await daoport.setApprovalForAll(parameters);
    //     console.log("daoporApprovedtAction --txHash", txHash);
    //     if (getIsApproveNFT) {
    //         getIsApproveNFT(true, item, index);
    //     }
    // } catch (error) {
    //     var reg = RegExp(/Transaction was not mined within/);
    //     if (error.message.match(reg)) {

    //     } else {
    //         if (faildHandle) {
    //             faildHandle(item)
    //         }
    //     }
    // }
}

export async function getNFTTokenIDs(item, handleGetNFTTokenIDs, index) {
    // if (!accounts) {
    //     await getAccounts();
    // }

    // if (!daoport) {
    //     getDaoPort(accounts[0]);
    // }
    // const owner = accounts[0];
    // var contractAddress = item.nft;
    // item.collection.contractAddress = contractAddress;
    // const rangeTokenIds = item.poolInfo.rangeTokenIds;
    // var parameters = {
    //     contractAddress,
    //     owner,
    //     rangeTokenIds
    // };
    // const tokenIds = await daoport.ownedNFTTokens(parameters);
    // console.log("daoportAction=== tokenIds:", tokenIds);
    // if (handleGetNFTTokenIDs) {
    //     handleGetNFTTokenIDs(tokenIds, item, index);
    // }

    if (!accounts) {
        await getAccounts();
    }

    if (!daoport) {
        getDaoPort(accounts[0]);
    }
    const user = accounts[0];
    const pids = [item.poolInfo.pid]
    var parameters = {
        pids,
        user,
    };
    const tokenIds = await daoport.ownedNFTsTokenIdsByPids(parameters);
    console.log("ownedNFTsTokenIdsByPids=== tokenIds:", tokenIds);
    if (handleGetNFTTokenIDs) {
        handleGetNFTTokenIDs(tokenIds[0], item, index);
    }


}

export function setInputAccountAddress(address) {
    iuputAccountAddress = address;
}

export async function getWNFTTokenIDs(item, handleGetWNFTTokenIDs, isHarvest) {
    // if (!accounts) {
    //     await getAccounts();
    // }

    // if (!daoport) {
    //     getDaoPort(accounts[0]);
    // }
    // const owner = accounts[0];
    // const rangeTokenIds = item.poolInfo.rangeTokenIds;
    // var contractAddress = item.poolInfo.wnft;
    // var parameters = {
    //     contractAddress,
    //     owner,
    //     rangeTokenIds
    // };
    // const tokenIds = await daoport.ownedNFTTokens(parameters);
    // console.log("daoportAction=== tokenIds:", tokenIds);
    // if (handleGetWNFTTokenIDs) {
    //     handleGetWNFTTokenIDs(tokenIds, item, isHarvest);
    // }

    if (!accounts) {
        await getAccounts();
    }

    if (!daoport) {
        getDaoPort(accounts[0]);
    }
    const user = accounts[0];
    const pids = [item.poolInfo.pid]
    var parameters = {
        pids,
        user,
    };
    const tokenIds = await daoport.ownedWNFTsTokenIdsByPids(parameters);
    console.log("ownedNFTsTokenIdsByPids=== tokenIds:", tokenIds);
    if (handleGetWNFTTokenIDs) {
        handleGetWNFTTokenIDs(tokenIds[0], item, isHarvest);
    }
}


export async function daoporDeposit(item, handleDeposit, tokenIds, faildHandle, requesUploadHash) {
    if (!accounts) {
        await getAccounts();
    }
    if (!daoport) {
        getDaoPort(accounts[0]);
    }
    const pid = item.poolInfo.pid;
    // const tokenIds = [4, 5];
    const parameters = {
        pid,
        tokenIds
    };

    await daoport.deposit(
        pid,
        tokenIds,
        txHash => {
            if (requesUploadHash) {
                requesUploadHash(txHash)
            }
            console.log("deposit on:::", txHash);
        },
        res => {
            if (handleDeposit) {
                handleDeposit(res, item);
            }
            console.log("deposit then:::", res);
        },
        err => {

            var reg = RegExp(/Transaction was not mined within/);
            if (err.message.match(reg)) {

            } else {
                if (faildHandle) {
                    faildHandle(item)
                }
            }
            console.log("deposit catch:::", err);
        }
    );

    // try {
    //     const txHash = await daoport.deposit(parameters);
    //     console.log("daoporDeposit==txhash", txHash);
    //     if (handleDeposit) {
    //         handleDeposit(txHash, item);
    //     }
    // } catch (error) {
    //     var reg = RegExp(/Transaction was not mined within/);
    //     if (error.message.match(reg)) {

    //     } else {
    //         if (faildHandle) {
    //             faildHandle(item)
    //         }
    //     }
    // }
}

export async function daoporWithdraw(item, handleWithdraw, tokenIds, faildHandle, requesUploadHash) {
    if (!accounts) {
        await getAccounts();
    }

    if (!daoport) {
        getDaoPort(accounts[0]);
    }
    const pid = item.poolInfo.pid;
    // const tokenIds = [4, 5];
    const parameters = {
        pid,
        tokenIds
    };

    await daoport.withdraw(
        pid,
        tokenIds,
        txHash => {
            if (requesUploadHash) {
                requesUploadHash(txHash)
            }
            console.log("withdraw on:::", txHash);
        },
        res => {
            if (handleWithdraw) {
                handleWithdraw(res, item);
            }
            console.log("withdraw then:::", res);
        },
        err => {

            var reg = RegExp(/Transaction was not mined within/);
            if (err.message.match(reg)) {

            } else {
                if (faildHandle) {
                    faildHandle(item)
                }
            }
            console.log("withdraw catch:::", err);
        }
    );

    // try {
    //     const txHash = await daoport.withdraw(parameters);
    //     console.log("daoporDeposit==txhash", txHash);
    //     if (handleWithdraw) {
    //         handleWithdraw(txHash, item);
    //     }
    // } catch (error) {
    //     var reg = RegExp(/Transaction was not mined within/);
    //     if (error.message.match(reg)) {

    //     } else {
    //         if (faildHandle) {
    //             faildHandle(item)
    //         }
    //     }
    // }
}
export async function daoporHarvest(item, handleHarvest, tokenIds, faildHandle, requesUploadHash) {
    if (!accounts) {
        await getAccounts();
    }

    if (!daoport) {
        getDaoPort(accounts[0]);
    }
    const owner = accounts[0];
    const pid = item.poolInfo.pid;
    const to = owner;
    const wnftTokenIds = tokenIds;
    const parameters = {
        pid,
        to,
        wnftTokenIds
    };


    await daoport.harvest(
        pid,
        to,
        wnftTokenIds,
        txHash => {
            if (requesUploadHash) {
                requesUploadHash(txHash)
            }
            console.log("harvest on:::", txHash);
        },
        res => {
            if (handleHarvest) {
                handleHarvest(res, item);
            }
            console.log("harvest then:::", res);
        },
        err => {

            var reg = RegExp(/Transaction was not mined within/);
            if (err.message.match(reg)) {

            } else {
                if (faildHandle) {
                    faildHandle(item)
                }
            }
            console.log("harvest catch:::", err);
        }
    );

    // try {
    //     const txHash = await daoport.harvest(parameters);
    //     console.log("daoporHarvest==txhash", txHash);
    //     if (handleHarvest) {
    //         handleHarvest(txHash, item)
    //     }
    // } catch (error) {

    //     var reg = RegExp(/Transaction was not mined within/);
    //     if (error.message.match(reg)) {

    //     } else {
    //         if (faildHandle) {
    //             faildHandle(item)
    //         }
    //     }

    // }
}


export async function getBonusRewardAction(item, handleGetBonusReward, index) {

    ///获取分红，奖励

    if (!accounts) {
        await getAccounts();
    }

    if (!daoport) {
        getDaoPort(accounts[0]);
    }
    const owner = accounts[0];
    const wnftContract = item.poolInfo.wnft;
    const pid = item.poolInfo.pid;
    const maxTokenId = 100;
    var parameters = {
        wnftContract,
        owner,
        maxTokenId
    };
    const tokenIds = await daoport.ownedTokens(parameters);
    console.log("daoportAction=== tokenIds:", tokenIds);

    if (tokenIds && tokenIds.length) {
        parameters = {
            pid,
            tokenIds
        };
        await daoport.pending(parameters, function (error, result) {

            console.log("daoportAction=== error/result:", error, result);
            if (handleGetBonusReward) {
                handleGetBonusReward(result, item, index);
            }
        });
    }
}



export function getInfura() {
    let infura;
    if (chain_Id === 1) {
        infura = "https://mainnet.infura.io/";
    } else if (chain_Id === 4) {
        infura = "https://rinkeby.infura.io/";
    }
    infura += "v3/c1b0dbb2fcf445278b966cc102873180";
    return infura;
}

export function getBlockNumber(updateBlockData) {
    initReadWeb3().eth.getBlockNumber()
        .then((blockNumber) => {
            if (updateBlockData) {
                updateBlockData(blockNumber);
            }
        });
}



export function onBlockNumberChange(updateBlockData) {
    var subscription = initWeb3().eth.subscribe('newBlockHeaders', function (error, result) {
        if (!error) {
            // console.log("result", result);
            if (updateBlockData) {
                updateBlockData(result.number, initWeb3());
            }
            return;
        }

        console.error(error);
    })
        .on("connected", function (subscriptionId) {
            // console.log(subscriptionId);
        })
        .on("data", function (blockHeader) {
            // if (updateBlockData) {
            //     updateBlockData(blockHeader);
            // }
            // console.log("blockHeader", blockHeader);
        })
        .on("error", console.error);

    // unsubscribes the subscription
    subscription.unsubscribe(function (error, success) {
        if (success) {
            console.log('Successfully unsubscribed!');
        }
    });
}


export function onLogsChange() {
    var subscription = initWeb3().eth.subscribe('logs', {
        address: '0xBDfbad1376a7acf5Cd1692DdE2981174cE989D80',
        // topics: ['0x12345...']
    }, function (error, result) {
        if (!error)
            console.log("onLogsChange********", result);
    })
        .on("connected", function (subscriptionId) {
            console.log(subscriptionId);
        })
        .on("data", function (log) {
            console.log(log);
        })
        .on("changed", function (log) {
        });

    // unsubscribes the subscription
    subscription.unsubscribe(function (error, success) {
        if (success)
            console.log('Successfully unsubscribed!');
    });
}



export async function addSTBtoWallet() {

    const tokenAddress = getProdcutMode() == 0 ? "0xF864C6390B410D0Ce497faA5b9e768794765B35a" : "0xc481a850aead5002598b7ed355cbb3349c148072";
    const tokenSymbol = 'STB';
    const tokenDecimals = 18;
    const tokenImage = 'https://file.starblock.io/coin/bg_stb.png';

    try {
        // wasAdded is a boolean. Like any RPC method, an error may be thrown.
        const wasAdded = await ethereum.request({
            method: 'wallet_watchAsset',
            params: {
                type: 'ERC20', // Initially only supports ERC20, but eventually more!
                options: {
                    address: tokenAddress, // The address that the token is at.
                    symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
                    decimals: tokenDecimals, // The number of decimals in the token
                    image: tokenImage, // A string url of the token logo
                },
            },
        });

        if (wasAdded) {
            console.log('Thanks for your interest!');
        } else {
            console.log('Your loss!');
        }
    } catch (error) {
        console.log(error);
    }
}

export async function getAccounts() {
    if (iuputAccountAddress) {
        accounts = [iuputAccountAddress]
        return accounts;
    }
    if (!window.ethereum) {
        accounts = ["0x0000000000000000000000000000000000000000"];
        return accounts;
    }
    if (!window.ethereum.selectedAddress) {
        accounts = ["0x0000000000000000000000000000000000000000"];
        return accounts;
    } else {
        const web3Modal = new Web3Modal({
            theme: "dark",
            // network: getChainData(walletObj.chainId).network,
            network: network_Name,
            cacheProvider: true,
            providerOptions
        });

        const provider = await web3Modal.connect();
        // await subscribeProvider(provider);

        web3 = new Web3(provider);
        accounts = await web3.eth.getAccounts();
        return accounts;
    }

    // if (getAccountHandle) {
    //     getAccountHandle(accounts)
    // }
}

export async function getDaoPort(account) {
    daoport = new DaoPort(initWeb3(), chain_Id);
    daoport.setAccount(account);
    daoport.setOnlyReadWeb3Provider(initReadWeb3());
    // daoport.setOnlyReadWeb3Provider(initWeb3());


}


export async function getCurrentChainId(handle) {
    const chainId = await ethereum.request({ method: 'eth_chainId' });
    if (handle && chainId) {
        handle(utils.hexToNumber(chainId));
    }
    console.log(utils.hexToNumber(chainId));
}

// 获取当前Metamaske账户
export async function getAccount(updateLoginBtn, getAccountError) {

    ethereum
        .request({ method: 'eth_requestAccounts' })
        .then((account) => {
            // alert(account);
            updateLoginBtn(account[0]);
        })
        .catch((err) => {
            // Some unexpected error.
            // For backwards compatibility reasons, if no accounts are available,
            // eth_accounts will return an empty array.
            if (getAccountError) {
                getAccountError();
            }
            console.error(err);
            // alert(err);

        });
}




export function getEtherscanOfCollection(contractAddress) {
    if (getProdcutMode() == 0) {
        return "https://rinkeby.etherscan.io/address/" + contractAddress;
    } else {
        return "https://etherscan.io/address/" + contractAddress;
    }
}

export function getEtherscanOfNFT(contractAddress, tokenID) {
    if (getProdcutMode() == 0) {
        return "https://rinkeby.etherscan.io/token/" + contractAddress + "?" + "@={" + tokenID + "}" + "#inventory";
    } else {
        return "https://etherscan.io/token/" + contractAddress + "?" + "@={" + tokenID + "}" + "#inventory";
    }
}

export function getOpenSeaOfCollection(name) {
    if (getProdcutMode() == 0) {
        return "https://testnets.opensea.io/collection/" + name;
    } else {
        return "https://opensea.io/collection/" + name;
    }
}

export function getOpenSeaOfNFT(contractAddress, tokenID) {
    if (getProdcutMode() == 0) {
        return "https://testnets.opensea.io/assets/rinkeby/" + contractAddress + "/" + tokenID;
    } else {
        return "https://opensea.io/collection/assets/" + contractAddress + "/" + tokenID;
    }
}


export function getStarBlockOfCollection(contractAddress) {
    if (getProdcutMode() == 0) {
        return "http://192.168.1.182/collection/" + contractAddress;
    } else {
        return "https://www.starblock.io/collection/" + contractAddress;
    }
}

export function getStarBlockOfNFT(contractAddress, tokenID) {
    if (getProdcutMode() == 0) {
        return "https://testnets.opensea.io/assets/rinkeby/" + contractAddress + "/" + tokenID;
    } else {
        return "https://opensea.io/collection/assets/" + contractAddress + "/" + tokenID;
    }
}

export function openseaApiBaseUrl() {
    if (getProdcutMode() == 0) {
        return "https://testnets-api.opensea.io/api/v1/";
    } else {
        return "https://api.opensea.io/api/v1/";
    }
}

export function etherscanCountDownBase() {
    if (getProdcutMode() == 0) {
        return "https://rinkeby.etherscan.io/block/countdown/";
    } else {
        return "https://etherscan.io/block/countdown/";
    }
}


export function etherscanAccountBalanceBase(accountAddress) {
    if (getProdcutMode() == 0) {
        return "https://rinkeby.etherscan.io/token/0xF864C6390B410D0Ce497faA5b9e768794765B35a?a=" + accountAddress;
    } else {
        return "https://etherscan.io/token/0xc481a850aead5002598b7ed355cbb3349c148072?a=" + accountAddress;
    }
}


export function etherscanBlockNumberBase() {
    if (getProdcutMode() == 0) {
        return "https://rinkeby.etherscan.io/block/";
    } else {
        return "https://etherscan.io/block/";
    }
}




