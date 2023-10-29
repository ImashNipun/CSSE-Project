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
  const [allTransactionListShop, setAllTransactionListShop] = useState([]);

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
    setAllTopUpTransactionList([]);
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
          date: new Date(transaction.createdAt).toLocaleDateString(),
          time: new Date(transaction.createdAt).toLocaleTimeString(),
        };
      });
      setTotalTopupIncome(totalTopupIncome);
      setAllTopUpTransactionList((prev) => [...prev, ...topUpTransactionList]);
      setTopUpTransactionList(topUpTransactionList);
    } catch (error) {
      console.log(`${error.message}:`, error);
    }
  };

  const getRefundTransactionList = async () => {
    setAllTransactionListShop([]);
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
          date: new Date(transaction.createdAt).toLocaleDateString(),
          time: new Date(transaction.createdAt).toLocaleTimeString(),
        };
      });
      setTotalRefunds(totalRefunds);
      setRefundTransactionList(refundTransactionList);
      setAllTransactionListShop((prev) => [...prev, ...refundTransactionList]);
    } catch (error) {
      console.log(`${error.message}:`, error);
    }
  };

  const getPaypalTransactionList = async () => {
    setAllTopUpTransactionList([]);
    setAllTransactionListShop([]);
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
          date: new Date(transaction.createdAt).toLocaleDateString(),
          time: new Date(transaction.createdAt).toLocaleTimeString(),
        };
      });
      setTotalPaypalTopup(paypalTopup);
      setAllTopUpTransactionList((prev) => [...prev, ...paypalTransactionList]);
      setAllTransactionListShop((prev) => [...prev, ...paypalTransactionList]);
      setPaypalTransactionList(paypalTransactionList);
    } catch (error) {
      console.log(`${error.message}:`, error);
    }
  };

  useEffect(() => {
    gettopUpTransactionList();
    getRefundTransactionList();
    getPaypalTransactionList();
  }, [isAddCreditModalOpen, isRefundModalOpen, isTopUpModalOpen]);
  return (
    <div class="p-1">
      <h2 className="text-3xl font-bold mb-3 mt-2">Wallet</h2>
      <div className="bg-white shadow-lg p-5 rounded-lg">
        <div className="flex justify-between mb-4">
          <div>
            <p className="text-sm text-gray-500">Current Balance</p>
            <p className="text-2xl font-bold">
              $
              {auth?.user?.user_type == "shop"
                ? totalPaypalTopup + totalRefunds - totalTopupIncome
                : totalTopupIncome + totalPaypalTopup - totalRefunds}
            </p>
          </div>
          <div>
            <p className="text-sm text-green-500">Total Income</p>
            <p className="text-2xl font-bold">
              $
              {auth?.user?.user_type == "shop"
                ? totalPaypalTopup + totalRefunds
                : totalTopupIncome + totalPaypalTopup}
            </p>
          </div>
          <div>
            <p className="text-sm text-red-500">
              Total {auth?.user?.user_type == "shop" ? "Topups" : "Refunds"}
            </p>
            <p className="text-2xl font-bold">
              $
              {auth?.user?.user_type == "shop"
                ? totalTopupIncome
                : totalRefunds}
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
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 ml-4"
          >
            Refund
          </button>
        )}
        {auth?.user?.user_type === "shop" &&
          totalPaypalTopup + totalRefunds - totalTopupIncome > 0 && (
            <button
              onClick={handleTopup}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 ml-4"
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
          currentBalance={totalPaypalTopup + totalTopupIncome - totalRefunds}
        />
        <TopupModel
          isOpen={isTopUpModalOpen}
          onClose={handleCloseTopupModal}
          onSubmit={handleTopupSubmission}
          currentBalance={totalPaypalTopup + totalRefunds - totalTopupIncome}
        />
      </div>

      <div class="mb-4 border-b border-gray-200 dark:border-gray-700">
        <ul
          class="flex flex-wrap -mb-px text-sm font-medium text-center"
          id="default-tab"
          data-tabs-toggle="#default-tab-content"
          role="tablist"
        >
          <li class="mr-2" role="presentation">
            <button
              class="inline-block p-4 border-b-2 rounded-t-lg"
              id="profile-tab"
              data-tabs-target="#profile"
              type="button"
              role="tab"
              aria-controls="profile"
              aria-selected="false"
              onClick={() => {
                setTransactionListOpen(true);
              }}
            >
              Transactions
            </button>
          </li>
          <li class="mr-2" role="presentation">
            <button
              class="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
              id="dashboard-tab"
              data-tabs-target="#dashboard"
              type="button"
              role="tab"
              aria-controls="dashboard"
              aria-selected="false"
              onClick={() => {
                setTransactionListOpen(false);
              }}
            >
              {auth?.user?.user_type === "shop" ? "Topups" : "Refund"}
            </button>
          </li>
        </ul>
      </div>

      <div className="mt-4">
        <h2 className="text-2xl font-bold">
          {istransactionListOpen ? "Transaction History" : "Refund History"}
        </h2>
        <div className="grid grid-cols-1 gap-4 mt-4">
          {istransactionListOpen &&
            (auth?.user?.user_type === "foreign" ||
              auth?.user?.user_type === "local") &&
            (allTopUpTransactionList.length > 0 ? (
              allTopUpTransactionList.map((transaction, index) => (
                <div
                  key={transaction.id}
                  className={`flex justify-between bg-white shadow-md p-4 rounded-lg border-l-4 border-green-500`}
                >
                  <div>
                    <p>{transaction.description}</p>
                    <p className="text-sm mt-2">
                      {"+"} ${Math.abs(transaction.amount)}
                    </p>
                  </div>
                  <div>
                    <p>{transaction.date}</p>
                    <p className="text-sm mt-2">{transaction.time}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>No Transaction History</p>
            ))}

          {istransactionListOpen &&
            auth?.user?.user_type === "shop" &&
            (allTransactionListShop.length > 0 ? (
              allTransactionListShop.map((transaction, index) => (
                <div
                  key={transaction.id}
                  className={`flex justify-between bg-white shadow-md p-4 rounded-lg border-l-4 border-green-500`}
                >
                  <div>
                    <p>{transaction.description}</p>
                    <p className="text-sm mt-2">
                      {"+"} ${Math.abs(transaction.amount)}
                    </p>
                  </div>
                  <div>
                    <p>{transaction.date}</p>
                    <p className="text-sm mt-2">{transaction.time}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>No Transaction History</p>
            ))}

          {!istransactionListOpen &&
            (auth?.user?.user_type === "foreign" ||
            auth?.user?.user_type === "local") &&
            (refundTransactionList.length > 0 ? (
              refundTransactionList.map((transaction, index) => (
                <div
                  key={transaction.id}
                  className={`flex justify-between bg-white shadow-md p-4 rounded-lg border-l-4 border-red-500`}
                >
                  <div>
                    <p>
                      {auth?.user?.user_type === "shop"
                        ? "Topup Transaction"
                        : transaction.description}
                    </p>
                    <p className="text-sm mt-2">
                      {"-"} ${Math.abs(transaction.amount)}
                    </p>
                  </div>
                  <div>
                    <p>{transaction.date}</p>
                    <p className="text-sm mt-2">{transaction.time}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>No Refund History</p>
            ))}

          {!istransactionListOpen &&
            auth?.user?.user_type === "shop" &&
            (topUpTransactionList.length > 0 ? (
              topUpTransactionList.map((transaction, index) => (
                <div
                  key={transaction.id}
                  className={`flex justify-between bg-white shadow-md p-4 rounded-lg border-l-4 border-red-500`}
                >
                  <div>
                    <p>
                      {auth?.user?.user_type === "shop"
                        ? "Topup Transaction"
                        : transaction.description}
                    </p>
                    <p className="text-sm mt-2">
                      {"-"} ${Math.abs(transaction.amount)}
                    </p>
                  </div>
                  <div>
                    <p>{transaction.date}</p>
                    <p className="text-sm mt-2">{transaction.time}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>No Topup History</p>
            ))}
        </div>
      </div>
    </div>
  );
};

export default WalletPage;
