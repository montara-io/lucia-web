import ActionButton from '../../../stories/ActionButton/ActionButton';
import { ExploreButtonWrapper } from './styles';

export default function ExploreButton({ onClick, text }) {
  return (
    <ExploreButtonWrapper>
      <ActionButton
        data-testid="explore-button"
        id="explore-button"
        onClick={onClick}
      >
        {text}
      </ActionButton>
    </ExploreButtonWrapper>
  );
}
