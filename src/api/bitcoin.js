const BASE_URL = 'https://blockchain.info';
const BLOCKCYPHER_URL = 'https://api.blockcypher.com/v1/btc/main';

export const getBitcoinAddressInfo = async (address) => {
  try {
    const response = await fetch(`${BASE_URL}/rawaddr/${address}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();

    // Calculate total unspent balance, pending balance, confirmed UTXO count, and pending UTXO count
    let totalUnspentBalance = 0;
    let pendingBalance = 0;
    let confirmedUTXOCount = 0;
    let pendingUTXOCount = 0;

    data.txs.forEach(tx => {
      tx.out.forEach(output => {
        if (output.addr === address) {
          if (!output.spent) {
            totalUnspentBalance += output.value;
            if (tx.block_height) {
              confirmedUTXOCount++;
            } else {
              pendingBalance += output.value;
              pendingUTXOCount++;
            }
          }
        }
      });
    });

    return {
      totalUnspentBalance,
      pendingBalance,
      confirmedUTXOCount,
      pendingUTXOCount
    };
  } catch (error) {
    console.error('Error fetching Bitcoin address info:', error);
    throw error;
  }
};

export const getBitcoinAddressInfoBlockCypher = async (address) => {
  try {
    const response = await fetch(`${BLOCKCYPHER_URL}/addrs/${address}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();

    // Calculate total unspent balance, pending balance, confirmed UTXO count, and pending UTXO count
    let totalUnspentBalance = data.balance;
    let pendingBalance = data.unconfirmed_balance;
    let confirmedUTXOCount = data.final_n_tx - data.unconfirmed_n_tx;
    let pendingUTXOCount = data.unconfirmed_n_tx;

    return {
      totalUnspentBalance,
      pendingBalance,
      confirmedUTXOCount,
      pendingUTXOCount
    };
  } catch (error) {
    console.error('Error fetching Bitcoin address info from BlockCypher:', error);
    throw error;
  }
};
