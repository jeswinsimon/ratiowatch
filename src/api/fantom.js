const BASE_URL = 'https://explorer.fantom.network/api';
const FANTOM_FOUNDATION_URL = 'https://api.fantom.network';
const FANTOM_GRAPHQL_URL = 'https://graphql.fantom.network/';
const COVALENT_URL = 'https://api.covalenthq.com/v1';
const FANTOM_EXPLORER_URL = 'https://explorer.fantom.network/address';

export const getFantomAddressInfo = async (address) => {
  try {
    const response = await fetch(`${BASE_URL}?module=account&action=balance&address=${address}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();

    if (data.status !== "1") {
      throw new Error('Error fetching Fantom address info');
    }

    const balance = data.result;

    return {
      balance
    };
  } catch (error) {
    console.error('Error fetching Fantom address info:', error);
    throw error;
  }
};

export const getFantomAddressInfoFoundation = async (address) => {
  try {
    const response = await fetch(`${FANTOM_FOUNDATION_URL}/api/v1/address/${address}/balance`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();

    const balance = data.balance;

    return {
      balance
    };
  } catch (error) {
    console.error('Error fetching Fantom address info from Fantom Foundation:', error);
    throw error;
  }
};

export const getFantomAddressInfoGraphQL = async (address) => {
  try {
    const query = `
      query {
        account(address: "${address}") {
          balance
        }
      }
    `;
    const response = await fetch(FANTOM_GRAPHQL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();

    const balance = data.data.account.balance;

    return {
      balance
    };
  } catch (error) {
    console.error('Error fetching Fantom address info from GraphQL:', error);
    throw error;
  }
};

export const getFantomAddressInfoCovalent = async (address) => {
  try {
    const response = await fetch(`${COVALENT_URL}/fantom-mainnet/address/${address}/balances_v2/?key=YourApiKeyToken`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();

    const balance = data.data.items.find(item => item.contract_ticker_symbol === 'FTM').balance;

    return {
      balance
    };
  } catch (error) {
    console.error('Error fetching Fantom address info from Covalent:', error);
    throw error;
  }
};

export const getFantomAddressInfoFromHTML = async (address) => {
  try {
    const response = await fetch(`${FANTOM_EXPLORER_URL}/${address}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const balanceElement = doc.querySelector('.balance');
    const balance = balanceElement ? balanceElement.textContent.trim() : null;

    if (!balance) {
      throw new Error('Error parsing balance from HTML');
    }

    return {
      balance: parseFloat(balance.replace(/,/g, ''))
    };
  } catch (error) {
    console.error('Error fetching Fantom address info from HTML:', error);
    throw error;
  }
};
