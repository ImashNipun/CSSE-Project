import React, { useEffect, useState } from "react";
import AddCreditModal from "../../components/payment/AddCreditModal";
import RefundModal from "../../components/payment/RefundModal";
import TopupModel from "../../components/payment/TopupModel";
import useAuth from "../../hook/useAuth";
import { config } from "../../config/config";
import axios from "axios";

const WalletPage = ({ activeTab }) => {
  const { auth } = useAuth();
  console.log(auth);
  const [balance, setBalance] = useState(1000);
  const [income, setIncome] = useState(500);
  const [expenses, setExpenses] = useState(200);
  const [creditAmount, setCreditAmount] = useState(null);

  const [transactionHistory, setTransactionHistory] = useState([]);
  const [topUpTransactionList, setTopUpTransactionList] = useState([]);
  const [refundTransactionList, setRefundTransactionList] = useState([]);
  const [paypalTransactionList, setPaypalTransactionList] = useState([]);
  const [allTopUpTransactionList, setAllTopUpTransactionList] = useState([]);

  const [istransactionListOpen, setTransactionListOpen] = useState(true);

  const [isAddCreditModalOpen, setAddCreditModalOpen] = useState(false);
  const [isTopUpModalOpen, setTopUpModalOpen] = useState(false);
  const [isRefundModalOpen, setRefundModalOpen] = useState(false);
  const [isCreditSaved, setIsCreditSaved] = useState(false);

  const [totalTopupIncome, setTotalTopupIncome] = useState(0);
  const [totalRefunds, setTotalRefunds] = useState(0);
  const [totalPaypalTopup, setTotalPaypalTopup] = useState(0);

  const [shopAnalitics, setShopAnalitics] = useState({
    totalIncome: 0,
    totalExpenses: 0,
    totalBalance: 0,
  });

  const [localAnalitics, setLocalAnalitics] = useState({
    totalIncome: 0,
    totalExpenses: 0,
    totalBalance: 0,
  });

  const handleAddCredit = () => {
    setAddCreditModalOpen(true);
  };

  const handleRefund = () => {
    setRefundModalOpen(true);
  };

  const handleTopup = () => {
    setTopUpModalOpen(true);
  };

  const handleCloseAddCreditModal = () => {
    setAddCreditModalOpen(false);
  };

  const handleCloseRefundModal = () => {
    setRefundModalOpen(false);
  };

  const handleCloseTopupModal = () => {
    setTopUpModalOpen(false);
  };

  const handleCreditSubmission = (value) => {
    setCreditAmount(value.amount);
    setIsCreditSaved(true);
  };

  const handleRefundSubmission = async (value) => {
    const { transaction_id, amount } = value;

    try {
      const result = await axios.post(
        `${config.BASE_URL}/api/v1/wallet/shop/refund`,
        {
          user_id: auth?.user?._id,
          transaction_id,
          amount,
        }
      );
      console.log(result);
    } catch (error) {
      console.log(`${error.message}:`, error);
    }
  };

  const handleTopupSubmission = async (value) => {
    const { transaction_id, amount, user_type } = value;
    try {
      const result = await axios.post(
        `${config.BASE_URL}/api/v1/wallet/shop/topup`,
        {
          user_id: auth?.user?._id,
          transaction_id,
          amount,
          user_type,
        }
      );
      console.log(result);
      setTopUpModalOpen(false);
    } catch (error) {
      console.log(`${error.message}:`, error);
    }
  };

  const handlePayWithPayPal = async (details, data) => {
    const payment_id = data.paymentID;
    const amount = details.purchase_units[0].amount.value;
    const status = details.status;
    try {
      const result = await axios.post(
        `${config.BASE_URL}/api/v1/wallet/paypal/topup`,
        {
          user_id: auth?.user?._id,
          payment_id,
          amount,
          status,
        }
      );
      console.log(result);
      setAddCreditModalOpen(false);
      setCreditAmount(null);
      setIsCreditSaved(false);
    } catch (error) {
      console.log(`${error.message}:`, error);
    }
  };

  const gettopUpTransactionList = async () => {
    try {
      const result = await axios.get(
        `${config.BASE_URL}/api/v1/wallet/topup?uid=${auth?.user?._id}&&type=${auth?.user?.user_type}`
      );
      let totalTopupIncome = 0;
      let topUpTransactionList = result?.data?.data.map((transaction) => {
        totalTopupIncome += transaction.amount;
        return {
          id: transaction._id,
          amount: transaction.amount,
          description: "Topup Transaction",
        };
      });
      setTotalTopupIncome(totalTopupIncome);
      setAllTopUpTransactionList((prev) => [...prev, ...topUpTransactionList]);
      setTopUpTransactionList(result?.data?.data);
    } catch (error) {
      console.log(`${error.message}:`, error);
    }
  };

  const getRefundTransactionList = async () => {
    try {
      const result = await axios.get(
        `${config.BASE_URL}/api/v1/wallet/refund?uid=${auth?.user?._id}&&type=${auth?.user?.user_type}`
      );
      let totalRefunds = 0;
      let refundTransactionList = result?.data?.data.map((transaction) => {
        totalRefunds += transaction.amount;
        return {
          id: transaction._id,
          amount: transaction.amount,
          description: "Refund Transaction",
        };
      });
      setTotalRefunds(totalRefunds);
      setRefundTransactionList(refundTransactionList);
    } catch (error) {
      console.log(`${error.message}:`, error);
    }
  };

  const getPaypalTransactionList = async () => {
    try {
      const result = await axios.get(
        `${config.BASE_URL}/api/v1/wallet/paypal/${auth?.user?._id}`
      );

      let paypalTopup = 0;
      let paypalTransactionList = result?.data?.data.map((transaction) => {
        paypalTopup += transaction.amount;
        return {
          id: transaction._id,
          amount: transaction.amount,
          description: "Paypal Transaction",
        };
      });
      setTotalPaypalTopup(paypalTopup);
      setAllTopUpTransactionList((prev) => [...prev, ...paypalTransactionList]);
      setPaypalTransactionList(paypalTransactionList);
    } catch (error) {
      console.log(`${error.message}:`, error);
    }
  };

  useEffect(() => {
    gettopUpTransactionList();
    getRefundTransactionList();
    getPaypalTransactionList();
  }, []);
  return (
    <div>
      <h2 className="text-2xl font-bold">Wallet</h2>
      <div className="bg-white shadow-lg p-4 rounded-lg">
        <div className="flex justify-between mb-4">
          <div>
            <p className="text-sm text-gray-500">Current Balance</p>
            <p className="text-2xl font-bold">
              $
              {auth?.user?.user_type == "foreign" || "local"
                ? totalTopupIncome + totalPaypalTopup - totalRefunds
                : totalPaypalTopup + totalRefunds - totalTopupIncome}
            </p>
          </div>
          <div>
            <p className="text-sm text-green-500">Total Income</p>
            <p className="text-2xl font-bold">
              $
              {auth?.user?.user_type == "foreign" || "local"
                ? totalTopupIncome + totalPaypalTopup
                : totalPaypalTopup + totalRefunds}
            </p>
          </div>
          <div>
            <p className="text-sm text-red-500">Total Expenses</p>
            <p className="text-2xl font-bold">
              $
              {auth?.user?.user_type == "foreign" || "local"
                ? totalRefunds
                : totalTopupIncome}
            </p>
          </div>
        </div>
        <button
          onClick={handleAddCredit}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Add Credit
        </button>
        {(auth.user.user_type === "local" ||
          auth?.user?.user_type === "foreign") && (
          <button
            onClick={handleRefund}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Refund
          </button>
        )}
        {auth?.user?.user_type === "shop" && (
          <button
            onClick={handleTopup}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Topup
          </button>
        )}
        <AddCreditModal
          isOpen={isAddCreditModalOpen}
          onClose={handleCloseAddCreditModal}
          onSubmit={handleCreditSubmission}
          isCreditSaved={isCreditSaved}
          onPayWithPayPal={handlePayWithPayPal}
          creditAmount={creditAmount}
        />
        <RefundModal
          isOpen={isRefundModalOpen}
          onClose={handleCloseRefundModal}
          onSubmit={handleRefundSubmission}
        />
        <TopupModel
          isOpen={isTopUpModalOpen}
          onClose={handleCloseTopupModal}
          onSubmit={handleTopupSubmission}
        />
      </div>
      <div className="mt-4">
        <button
          onClick={() => {
            setTransactionListOpen(true);
          }}
        >
          transactions
        </button>
        <button
          onClick={() => {
            setTransactionListOpen(false);
          }}
        >
          refunds
        </button>
        <h2 className="text-2xl font-bold">
          {istransactionListOpen ? "Transaction History" : "Refund History"}
        </h2>
        <div className="grid grid-cols-1 gap-4 mt-4">
          {istransactionListOpen &&
            allTopUpTransactionList.map((transaction, index) => (
              <div
                key={transaction.id}
                className={`bg-white shadow-md p-4 rounded-lg ${
                  transaction.amount > 0
                    ? "border-l-4 border-green-500"
                    : "border-l-4 border-red-500"
                }`}
              >
                <p>{transaction.description}</p>
                <p className="text-sm">
                  {transaction.amount > 0 ? "+" : "-"} $
                  {Math.abs(transaction.amount)}
                </p>
              </div>
            ))}
          {!istransactionListOpen &&
            refundTransactionList.map((transaction, index) => (
              <div
                key={transaction.id}
                className={`bg-white shadow-md p-4 rounded-lg ${
                  transaction.amount > 0
                    ? "border-l-4 border-green-500"
                    : "border-l-4 border-red-500"
                }`}
              >
                <p>{transaction.description}</p>
                <p className="text-sm">
                  {transaction.amount > 0 ? "+" : "-"} $
                  {Math.abs(transaction.amount)}
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default WalletPage;
