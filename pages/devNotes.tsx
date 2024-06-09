import React from "react";

const DevNotes: React.FC = () => {
  const notesToRemember = [
    {
      id: "1",
      title: "Restart TypeScript server to solve a bunch of linting issues",
      content: `cmd + shift + p, then Restart TS Server (same with ESLint etc)`,
    },
    {
      id: "2",
      title:
        "Change ownership of node_modules cache folder to avoid permission issues",
      content: `sudo mkdir -p node_modules/.cache && sudo chmod -R 777 node_modules/.cache`,
    },
    {
      id: "3",
      title: "Fix openVPN error: Error calling protect() method on socket",
      content:
        "sudo launchctl unload -w /Library/LaunchDaemons/org.openvpn.client.plist",
      contentLine2: "ps auxww | grep ovpnagent",
      contentLine3:
        "sudo launchctl load -w /Library/LaunchDaemons/org.openvpn.client.plist",
      contentLine4: "ps auxww | grep ovpnagent",
    },
    {
      id: "4",
      title: "Run a test file from JL container",
      content: "// Enter the JL container: docker exec -it jl bash",
      contentLine2:
        "Run the php test file: ./vendor/bin/phpunit testing/php/jumbo/lotteries/core/service/SubscriptionTicketServiceTest.php",
    },
    {
      id: "5",
      title: "Disable sleep on MacOS",
      content: "sudo pmset disablesleep 1 // To disable sleep",
      contentLine2: "sudo pmset disablesleep 0 // To enable sleep",
    }
  ];

  return (
    <div id="dev-notes" className="p-4 bg-gray-100 h-screen">
      <header className="mb-6 text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500 bg-clip-text text-transparent">
          Dev notes and tips
        </h1>
      </header>

      {notesToRemember.map((notes) => (
        <section
          key={notes.id}
          className="mb-4 p-6 bg-white rounded-lg shadow-md border-l-4 border-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500"
        >
          <div className="ml-4 mb-2 flex items-center gap-2">
            <div className="text-lg font-bold text-gray-600">{notes.id}:</div>
            <div className="text-lg text-gray-800">{notes.title}</div>
          </div>
          <pre className="p-4 bg-gray-100 rounded-lg overflow-auto">
            <code className="text-gray-800">{notes.content}</code>
          </pre>
          {notes.contentLine2 && (
            <pre className="p-4 bg-gray-100 rounded-lg overflow-auto">
              <code className="text-gray-800">{notes.contentLine2}</code>
            </pre>
          )}
          {notes.contentLine3 && (
            <pre className="p-4 bg-gray-100 rounded-lg overflow-auto">
              <code className="text-gray-800">{notes.contentLine3}</code>
            </pre>
          )}
          {notes.contentLine4 && (
            <pre className="p-4 bg-gray-100 rounded-lg overflow-auto">
              <code className="text-gray-800">{notes.contentLine4}</code>
            </pre>
          )}
        </section>
      ))}
    </div>
  );
};

export default DevNotes;


import { Modal as AntModal, Typography } from "antd";
import styled from "styled-components";

import useReduxAction from "@/hooks/useReduxAction";

const { Title } = Typography;

const Modal = styled(AntModal)`
	&& .ant-modal-body {
		padding: 48px 48px 32px;
	}
`;

const Header = styled.div`
	margin-bottom: 32px;
`;

interface Props {
	isVisible: boolean;
	toggleVisible: () => void;
	// recurringPurchase: Subscription;
}

function SubscriptionTimedPauseModal(props: Props) {
	const { isVisible, toggleVisible } = props;
	// const { price, numberOfTickets, nextPurchaseDate } = recurringPurchase;

	// const { formatAmount, formatPlural } = useIntl();

	// const formattedPrice = formatAmount(price);
	// const formattedPurchaseDate = getFormattedDate(nextPurchaseDate);

	// const { run: editSubscription } = useReduxAction(
	// 	updateSubscriptionValue,
	// 	[],
	// 	{
	// 		statusHandler: "message",
	// 		successMessage: `Subscription value changed. The new monthly charge will begin from ${formattedPurchaseDate}.`,
	// 		defaultErrorMessage:
	// 			"An error occurred and the subscription value was not changed. Please try again.",
	// 	},
	// );

	// const handleEditSubscription = async (id: string, offer: RaffleBookOffer) => {
	// 	editSubscription({
	// 		subscriptionId: recurringPurchase.autoplayId,
	// 		gameOffer: offer.key,
	// 	}).then(toggleVisible);
	// };

	// const bookSize = formatPlural(numberOfTickets, [
	// 	["one", "ticket"],
	// 	["other", "tickets"],
	// ]);

	return (
		<Modal
			visible={isVisible}
			onCancel={toggleVisible}
			width="900px"
			footer={null}>
			<Header>
				<Title level={3}>Pause subscription settings</Title>
			</Header>
			{/* <RecurringPurchaseRaffleOfferList
				recurringPurchase={recurringPurchase}
				handleEditRP={handleEditSubscription}
				confirmEditRPMessage={price =>
					`Change subscription value to ${price} monthly?`
				}
			/> */}
		</Modal>
	);
}

export default SubscriptionTimedPauseModal;






import { useEffect, useState } from "react";

import { Button, Typography } from "antd";
import styled from "styled-components";

import { useSelector } from "@/application/store";
import useHasCapability from "@/modules/authentication/hooks/useHasCapability";
import { selectProductOffer } from "@/modules/product/productRedux";
import { ProductOfferType } from "@/modules/product/productTypes";
import RecurringRafflePurchaseEdit from "@/modules/recurringPurchase/components/RecurringRafflePurchaseEdit";
import confirmCancelSubscription from "@/modules/subscription/components/confirmCancelSubscription";
import SubscriptionEditModal from "@/modules/subscription/components/SubscriptionEditModal";
import SubscriptionEditTicketSettingsModal from "@/modules/subscription/components/SubscriptionEditTicketSettingsModal";
import SubscriptionViewTicketSettingsModal from "@/modules/subscription/components/SubscriptionViewTicketSettingsModal";
import { Subscription } from "@/modules/subscription/subscriptionTypes";
import {
	isSubscriptionCancelled,
	isSubscriptionManaged,
	isSubscriptionPaused,
} from "@/modules/subscription/subscriptionUtils";

import SubscriptionPauseTimerModal from "./SubscriptionPauseTimerModal";
interface Props {
	subscription: Subscription;
	onPause: (subscription: Subscription) => any;
	onUnpause: (subscription: Subscription) => any;
	onCancel: (subscription: Subscription) => any;
}

const Container = styled.div`
	.ant-btn + .ant-btn {
		margin-left: 8px;
	}
`;

const Note = styled(Typography.Paragraph)`
	font-style: italic;
	opacity: 55%;
`;

export default function SubscriptionActionsBlock(props: Props) {
	const { subscription, onPause, onUnpause, onCancel } = props;

	const [currentlyOpenModal, setCurrentlyOpenModal] = useState<
		| "none"
		| "editRaffle"
		| "viewTicketSettings"
		| "editTicketSettings"
		| "editPauseSubscriptionTimer"
	>("none");

	const canManage = useHasCapability("recurring_purchase.manage");

	const { lotteryId } = subscription;

	const productOffer = useSelector(s => selectProductOffer(s, lotteryId));

	const isCancelled = isSubscriptionCancelled(subscription);
	const isManaged = isSubscriptionManaged(subscription);
	const isPaused = isSubscriptionPaused(subscription);

	const showActions = !isCancelled && isManaged;

	const showEditLotteryAction =
		productOffer && productOffer.type === ProductOfferType.LotteryTicket;

	const onConfirm = () => onCancel(subscription);
	const confirmCancel = () => confirmCancelSubscription({ onConfirm });

	const pauseAction = isPaused ? onUnpause : onPause;
	const pauseText = `${isPaused ? "Resume" : "Pause"} subscription`;

	useEffect(() => {
		console.log("currentlyOpenModal", currentlyOpenModal);
		console.log("showEditLotteryAction", showEditLotteryAction);
	}, [currentlyOpenModal, showEditLotteryAction]);

	if (!showActions) {
		return null;
	}

	if (!canManage) {
		return <Note>You don't have permission to edit this subscription.</Note>;
	}

	// TO-DO: Refactor JSX to ensure button + rendered modal are in child component for each instance/button.
	// Eg: RecurringRafflePurchaseEdit (button + modal in child)
	return (
		<Container>
			<div>
				{showEditLotteryAction ? (
					<>
						<Button
							onClick={() => setCurrentlyOpenModal("viewTicketSettings")}
							data-testid="viewTicketSettings">
							Ticket Settings
						</Button>
						<SubscriptionViewTicketSettingsModal
							recurringPurchase={subscription}
							isVisible={currentlyOpenModal === "viewTicketSettings"}
							onCloseClick={() => setCurrentlyOpenModal("none")}
							onEditClick={() => setCurrentlyOpenModal("editTicketSettings")}
						/>
						<SubscriptionEditTicketSettingsModal
							subscription={subscription}
							productOffer={productOffer}
							isVisible={currentlyOpenModal === "editTicketSettings"}
							onClose={() => setCurrentlyOpenModal("none")}
						/>
					</>
				) : (
					<>
						<RecurringRafflePurchaseEdit recurringPurchase={subscription} />
						<SubscriptionEditModal
							isVisible={currentlyOpenModal === "editRaffle"}
							toggleVisible={() => setCurrentlyOpenModal("none")}
							recurringPurchase={subscription}
						/>
					</>
				)}
				<Button
					onClick={() => setCurrentlyOpenModal("editPauseSubscriptionTimer")}
					data-testid="pauseSubscription">
					{pauseText}
				</Button>
				<SubscriptionPauseTimerModal
					isVisible={currentlyOpenModal === "editPauseSubscriptionTimer"}
					toggleVisible={() => setCurrentlyOpenModal("none")}
				/>
				<Button onClick={confirmCancel} data-testid="cancelSubscription" danger>
					Cancel subscription
				</Button>
			</div>
		</Container>
	);
}
