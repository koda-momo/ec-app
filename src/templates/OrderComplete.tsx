import { push } from "connected-react-router";
import { useDispatch } from "react-redux";
import { PrimaryButton } from "../components/uikit/PrimaryButton";

/**
 * 注文完了.
 */
export const OrderComplete = () => {
  const dispatch = useDispatch();

  return (
    <>
      <section className="c-section-wrapin">
        <div className="module-spacer--medium" />
        <h2 className="u-text__headline u-text-center">注文完了</h2>
        <div className="module-spacer--medium" />
        <div>注文が完了しました！引き続き買い物をお楽しみください。</div>
        <div className="module-spacer--medium" />
        <PrimaryButton
          label="ホームへ戻る"
          onClick={() => dispatch(push("/"))}
        />
      </section>
    </>
  );
};

export default OrderComplete;
