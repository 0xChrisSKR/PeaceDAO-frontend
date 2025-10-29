// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/// @title PeaceFund - World Peace DAO BNB Treasury (donation-only vault)
/// @notice Accepts BNB donations, emits on-chain events, exposes balance. No withdrawal function.
///         Future governance-controlled payout logic will live in a separate executor contract.
contract PeaceFund {
    event Donated(address indexed from, uint256 amount, string note);

    receive() external payable {
        emit Donated(msg.sender, msg.value, "");
    }

    function donate(string calldata note) external payable {
        require(msg.value > 0, "NO_VALUE");
        emit Donated(msg.sender, msg.value, note);
    }

    function balance() external view returns (uint256) {
        return address(this).balance;
    }
}
