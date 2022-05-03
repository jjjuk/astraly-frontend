export const ZKP_TOKEN_ABI = [
  {
    members: [
      {
        name: 'low',
        offset: 0,
        type: 'felt'
      },
      {
        name: 'high',
        offset: 1,
        type: 'felt'
      }
    ],
    name: 'Uint256',
    size: 2,
    type: 'struct'
  },
  {
    data: [
      {
        name: 'from_',
        type: 'felt'
      },
      {
        name: 'to',
        type: 'felt'
      },
      {
        name: 'value',
        type: 'Uint256'
      }
    ],
    keys: [],
    name: 'Transfer',
    type: 'event'
  },
  {
    data: [
      {
        name: 'owner',
        type: 'felt'
      },
      {
        name: 'spender',
        type: 'felt'
      },
      {
        name: 'value',
        type: 'Uint256'
      }
    ],
    keys: [],
    name: 'Approval',
    type: 'event'
  },
  {
    inputs: [
      {
        name: 'name',
        type: 'felt'
      },
      {
        name: 'symbol',
        type: 'felt'
      },
      {
        name: 'decimals',
        type: 'felt'
      },
      {
        name: 'initial_supply',
        type: 'Uint256'
      },
      {
        name: 'recipient',
        type: 'felt'
      },
      {
        name: 'owner',
        type: 'felt'
      },
      {
        name: '_cap',
        type: 'Uint256'
      },
      {
        name: '_distribution_address',
        type: 'felt'
      }
    ],
    name: 'constructor',
    outputs: [],
    type: 'constructor'
  },
  {
    inputs: [],
    name: 'cap',
    outputs: [
      {
        name: 'res',
        type: 'Uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'name',
    outputs: [
      {
        name: 'name',
        type: 'felt'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'symbol',
    outputs: [
      {
        name: 'symbol',
        type: 'felt'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'totalSupply',
    outputs: [
      {
        name: 'totalSupply',
        type: 'Uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'decimals',
    outputs: [
      {
        name: 'decimals',
        type: 'felt'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        name: 'account',
        type: 'felt'
      }
    ],
    name: 'balanceOf',
    outputs: [
      {
        name: 'balance',
        type: 'Uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        name: 'owner',
        type: 'felt'
      },
      {
        name: 'spender',
        type: 'felt'
      }
    ],
    name: 'allowance',
    outputs: [
      {
        name: 'remaining',
        type: 'Uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        name: 'recipient',
        type: 'felt'
      },
      {
        name: 'amount',
        type: 'Uint256'
      }
    ],
    name: 'transfer',
    outputs: [
      {
        name: 'success',
        type: 'felt'
      }
    ],
    type: 'function'
  },
  {
    inputs: [
      {
        name: 'sender',
        type: 'felt'
      },
      {
        name: 'recipient',
        type: 'felt'
      },
      {
        name: 'amount',
        type: 'Uint256'
      }
    ],
    name: 'transferFrom',
    outputs: [
      {
        name: 'success',
        type: 'felt'
      }
    ],
    type: 'function'
  },
  {
    inputs: [
      {
        name: 'spender',
        type: 'felt'
      },
      {
        name: 'amount',
        type: 'Uint256'
      }
    ],
    name: 'approve',
    outputs: [
      {
        name: 'success',
        type: 'felt'
      }
    ],
    type: 'function'
  },
  {
    inputs: [
      {
        name: 'spender',
        type: 'felt'
      },
      {
        name: 'added_value',
        type: 'Uint256'
      }
    ],
    name: 'increaseAllowance',
    outputs: [
      {
        name: 'success',
        type: 'felt'
      }
    ],
    type: 'function'
  },
  {
    inputs: [
      {
        name: 'spender',
        type: 'felt'
      },
      {
        name: 'subtracted_value',
        type: 'Uint256'
      }
    ],
    name: 'decreaseAllowance',
    outputs: [
      {
        name: 'success',
        type: 'felt'
      }
    ],
    type: 'function'
  },
  {
    inputs: [
      {
        name: 'to',
        type: 'felt'
      },
      {
        name: 'amount',
        type: 'Uint256'
      }
    ],
    name: 'mint',
    outputs: [],
    type: 'function'
  }
];

export const XZKP_TOKEN_ABI = [
  {
    members: [
      {
        name: 'low',
        offset: 0,
        type: 'felt'
      },
      {
        name: 'high',
        offset: 1,
        type: 'felt'
      }
    ],
    name: 'Uint256',
    size: 2,
    type: 'struct'
  },
  {
    data: [
      {
        name: 'implementation',
        type: 'felt'
      }
    ],
    keys: [],
    name: 'Upgraded',
    type: 'event'
  },
  {
    data: [
      {
        name: 'from_',
        type: 'felt'
      },
      {
        name: 'to',
        type: 'felt'
      },
      {
        name: 'value',
        type: 'Uint256'
      }
    ],
    keys: [],
    name: 'Transfer',
    type: 'event'
  },
  {
    data: [
      {
        name: 'owner',
        type: 'felt'
      },
      {
        name: 'spender',
        type: 'felt'
      },
      {
        name: 'value',
        type: 'Uint256'
      }
    ],
    keys: [],
    name: 'Approval',
    type: 'event'
  },
  {
    data: [
      {
        name: 'caller',
        type: 'felt'
      },
      {
        name: 'owner',
        type: 'felt'
      },
      {
        name: 'assets',
        type: 'Uint256'
      },
      {
        name: 'shares',
        type: 'Uint256'
      }
    ],
    keys: [],
    name: 'Deposit',
    type: 'event'
  },
  {
    data: [
      {
        name: 'caller',
        type: 'felt'
      },
      {
        name: 'receiver',
        type: 'felt'
      },
      {
        name: 'owner',
        type: 'felt'
      },
      {
        name: 'assets',
        type: 'Uint256'
      },
      {
        name: 'shares',
        type: 'Uint256'
      }
    ],
    keys: [],
    name: 'Withdraw',
    type: 'event'
  },
  {
    inputs: [],
    name: 'name',
    outputs: [
      {
        name: 'name',
        type: 'felt'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'symbol',
    outputs: [
      {
        name: 'symbol',
        type: 'felt'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'totalSupply',
    outputs: [
      {
        name: 'totalSupply',
        type: 'Uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'decimals',
    outputs: [
      {
        name: 'decimals',
        type: 'felt'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        name: 'account',
        type: 'felt'
      }
    ],
    name: 'balanceOf',
    outputs: [
      {
        name: 'balance',
        type: 'Uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        name: 'owner',
        type: 'felt'
      },
      {
        name: 'spender',
        type: 'felt'
      }
    ],
    name: 'allowance',
    outputs: [
      {
        name: 'remaining',
        type: 'Uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'asset',
    outputs: [
      {
        name: 'assetTokenAddress',
        type: 'felt'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'totalAssets',
    outputs: [
      {
        name: 'totalManagedAssets',
        type: 'Uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        name: 'assets',
        type: 'Uint256'
      }
    ],
    name: 'convertToShares',
    outputs: [
      {
        name: 'shares',
        type: 'Uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        name: 'shares',
        type: 'Uint256'
      }
    ],
    name: 'convertToAssets',
    outputs: [
      {
        name: 'assets',
        type: 'Uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        name: 'receiver',
        type: 'felt'
      }
    ],
    name: 'maxDeposit',
    outputs: [
      {
        name: 'maxAssets',
        type: 'Uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        name: 'assets',
        type: 'Uint256'
      }
    ],
    name: 'previewDeposit',
    outputs: [
      {
        name: 'shares',
        type: 'Uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        name: 'receiver',
        type: 'felt'
      }
    ],
    name: 'maxMint',
    outputs: [
      {
        name: 'maxShares',
        type: 'Uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        name: 'shares',
        type: 'Uint256'
      }
    ],
    name: 'previewMint',
    outputs: [
      {
        name: 'assets',
        type: 'Uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        name: 'owner',
        type: 'felt'
      }
    ],
    name: 'maxWithdraw',
    outputs: [
      {
        name: 'maxAssets',
        type: 'Uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        name: 'assets',
        type: 'Uint256'
      }
    ],
    name: 'previewWithdraw',
    outputs: [
      {
        name: 'shares',
        type: 'Uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        name: 'owner',
        type: 'felt'
      }
    ],
    name: 'maxRedeem',
    outputs: [
      {
        name: 'maxShares',
        type: 'Uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        name: 'shares',
        type: 'Uint256'
      }
    ],
    name: 'previewRedeem',
    outputs: [
      {
        name: 'assets',
        type: 'Uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    data: [
      {
        name: 'depositor',
        type: 'felt'
      },
      {
        name: 'receiver',
        type: 'felt'
      },
      {
        name: 'lp_address',
        type: 'felt'
      },
      {
        name: 'assets',
        type: 'Uint256'
      },
      {
        name: 'shares',
        type: 'Uint256'
      }
    ],
    keys: [],
    name: 'Deposit_lp',
    type: 'event'
  },
  {
    data: [
      {
        name: 'receiver',
        type: 'felt'
      },
      {
        name: 'owner',
        type: 'felt'
      },
      {
        name: 'lp_token',
        type: 'felt'
      },
      {
        name: 'assets',
        type: 'Uint256'
      },
      {
        name: 'shares',
        type: 'Uint256'
      }
    ],
    keys: [],
    name: 'Redeem_lp',
    type: 'event'
  },
  {
    data: [
      {
        name: 'caller',
        type: 'felt'
      },
      {
        name: 'receiver',
        type: 'felt'
      },
      {
        name: 'owner',
        type: 'felt'
      },
      {
        name: 'lp_token',
        type: 'felt'
      },
      {
        name: 'assets',
        type: 'Uint256'
      },
      {
        name: 'shares',
        type: 'Uint256'
      }
    ],
    keys: [],
    name: 'Withdraw_lp',
    type: 'event'
  },
  {
    inputs: [
      {
        name: 'lp_token',
        type: 'felt'
      }
    ],
    name: 'isTokenWhitelisted',
    outputs: [
      {
        name: 'res',
        type: 'felt'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        name: 'lp_token',
        type: 'felt'
      },
      {
        name: 'assets',
        type: 'Uint256'
      },
      {
        name: 'lock_time',
        type: 'felt'
      }
    ],
    name: 'previewDepositLP',
    outputs: [
      {
        name: 'shares',
        type: 'Uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'getCurrentBoostValue',
    outputs: [
      {
        name: 'res',
        type: 'felt'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        name: 'user',
        type: 'felt'
      }
    ],
    name: 'getUserStakeInfo',
    outputs: [
      {
        name: 'unlock_time',
        type: 'felt'
      },
      {
        name: 'tokens_len',
        type: 'felt'
      },
      {
        name: 'tokens',
        type: 'felt*'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'getTokensMask',
    outputs: [
      {
        name: 'tokens_mask',
        type: 'felt'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'getDefaultLockTime',
    outputs: [
      {
        name: 'lock_time',
        type: 'felt'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'getEmergencyBreaker',
    outputs: [
      {
        name: 'address',
        type: 'felt'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'getImplementation',
    outputs: [
      {
        name: 'address',
        type: 'felt'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        name: 'lp_token',
        type: 'felt'
      },
      {
        name: 'shares',
        type: 'Uint256'
      }
    ],
    name: 'previewRedeemLP',
    outputs: [
      {
        name: 'amount',
        type: 'Uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        name: 'lp_token',
        type: 'felt'
      },
      {
        name: 'input',
        type: 'Uint256'
      }
    ],
    name: 'previewWithdrawLP',
    outputs: [
      {
        name: 'amount',
        type: 'Uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        name: 'name',
        type: 'felt'
      },
      {
        name: 'symbol',
        type: 'felt'
      },
      {
        name: 'asset_addr',
        type: 'felt'
      },
      {
        name: 'owner',
        type: 'felt'
      }
    ],
    name: 'initializer',
    outputs: [],
    type: 'function'
  },
  {
    inputs: [
      {
        name: 'new_implementation',
        type: 'felt'
      }
    ],
    name: 'upgrade',
    outputs: [],
    type: 'function'
  },
  {
    inputs: [
      {
        name: 'lp_token',
        type: 'felt'
      },
      {
        name: 'mint_calculator_address',
        type: 'felt'
      }
    ],
    name: 'addWhitelistedToken',
    outputs: [
      {
        name: 'token_mask',
        type: 'felt'
      }
    ],
    type: 'function'
  },
  {
    inputs: [
      {
        name: 'lp_token',
        type: 'felt'
      }
    ],
    name: 'removeWhitelistedToken',
    outputs: [],
    type: 'function'
  },
  {
    inputs: [
      {
        name: 'address',
        type: 'felt'
      }
    ],
    name: 'setEmergencyBreaker',
    outputs: [],
    type: 'function'
  },
  {
    inputs: [
      {
        name: 'assets',
        type: 'Uint256'
      },
      {
        name: 'receiver',
        type: 'felt'
      }
    ],
    name: 'deposit',
    outputs: [
      {
        name: 'shares',
        type: 'Uint256'
      }
    ],
    type: 'function'
  },
  {
    inputs: [
      {
        name: 'assets',
        type: 'Uint256'
      },
      {
        name: 'receiver',
        type: 'felt'
      },
      {
        name: 'lock_time',
        type: 'felt'
      }
    ],
    name: 'depositForTime',
    outputs: [
      {
        name: 'shares',
        type: 'Uint256'
      }
    ],
    type: 'function'
  },
  {
    inputs: [
      {
        name: 'lp_token',
        type: 'felt'
      },
      {
        name: 'assets',
        type: 'Uint256'
      },
      {
        name: 'receiver',
        type: 'felt'
      },
      {
        name: 'lock_time',
        type: 'felt'
      }
    ],
    name: 'depositLP',
    outputs: [
      {
        name: 'shares',
        type: 'Uint256'
      }
    ],
    type: 'function'
  },
  {
    inputs: [
      {
        name: 'shares',
        type: 'Uint256'
      },
      {
        name: 'receiver',
        type: 'felt'
      }
    ],
    name: 'mint',
    outputs: [
      {
        name: 'assets',
        type: 'Uint256'
      }
    ],
    type: 'function'
  },
  {
    inputs: [
      {
        name: 'shares',
        type: 'Uint256'
      },
      {
        name: 'receiver',
        type: 'felt'
      },
      {
        name: 'owner',
        type: 'felt'
      }
    ],
    name: 'redeem',
    outputs: [
      {
        name: 'assets',
        type: 'Uint256'
      }
    ],
    type: 'function'
  },
  {
    inputs: [
      {
        name: 'lp_token',
        type: 'felt'
      },
      {
        name: 'shares',
        type: 'Uint256'
      },
      {
        name: 'owner',
        type: 'felt'
      },
      {
        name: 'receiver',
        type: 'felt'
      }
    ],
    name: 'redeemLP',
    outputs: [
      {
        name: 'amount',
        type: 'Uint256'
      }
    ],
    type: 'function'
  },
  {
    inputs: [
      {
        name: 'assets',
        type: 'Uint256'
      },
      {
        name: 'receiver',
        type: 'felt'
      },
      {
        name: 'owner',
        type: 'felt'
      }
    ],
    name: 'withdraw',
    outputs: [
      {
        name: 'shares',
        type: 'Uint256'
      }
    ],
    type: 'function'
  },
  {
    inputs: [
      {
        name: 'lp_token',
        type: 'felt'
      },
      {
        name: 'assets',
        type: 'Uint256'
      },
      {
        name: 'receiver',
        type: 'felt'
      },
      {
        name: 'owner',
        type: 'felt'
      }
    ],
    name: 'withdrawLP',
    outputs: [
      {
        name: 'shares',
        type: 'Uint256'
      }
    ],
    type: 'function'
  },
  {
    inputs: [
      {
        name: 'recipient',
        type: 'felt'
      },
      {
        name: 'amount',
        type: 'Uint256'
      }
    ],
    name: 'transfer',
    outputs: [
      {
        name: 'success',
        type: 'felt'
      }
    ],
    type: 'function'
  },
  {
    inputs: [
      {
        name: 'sender',
        type: 'felt'
      },
      {
        name: 'recipient',
        type: 'felt'
      },
      {
        name: 'amount',
        type: 'Uint256'
      }
    ],
    name: 'transferFrom',
    outputs: [
      {
        name: 'success',
        type: 'felt'
      }
    ],
    type: 'function'
  },
  {
    inputs: [
      {
        name: 'spender',
        type: 'felt'
      },
      {
        name: 'amount',
        type: 'Uint256'
      }
    ],
    name: 'approve',
    outputs: [
      {
        name: 'success',
        type: 'felt'
      }
    ],
    type: 'function'
  },
  {
    inputs: [
      {
        name: 'new_boost_value',
        type: 'felt'
      }
    ],
    name: 'setStakeBoost',
    outputs: [],
    type: 'function'
  },
  {
    inputs: [
      {
        name: 'new_lock_time',
        type: 'felt'
      }
    ],
    name: 'setDefaultLockTime',
    outputs: [],
    type: 'function'
  },
  {
    inputs: [],
    name: 'pause',
    outputs: [],
    type: 'function'
  },
  {
    inputs: [],
    name: 'unpause',
    outputs: [],
    type: 'function'
  }
];

export default {ZKP_TOKEN_ABI, XZKP_TOKEN_ABI};
