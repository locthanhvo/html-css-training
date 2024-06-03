import { Component, ReactNode } from 'react';
import { Text, VStack } from '@chakra-ui/react';
import ActionButton from '../ActionButton';

interface IState {
  hasError: boolean;
  error: Error | null;
}

interface IProps {
  children: ReactNode;
}

class ErrorBoundary extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): IState {
    return {
      hasError: true,
      error: error,
    };
  }

  componentDidCatch(error: Error) {
    this.setState({
      error,
    });
  }
  handleRefreshPage = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <VStack minH="50vh" spacing="20px">
          <Text size="lg">An error has been occurred!! </Text>
          <Text as="sub" style={{ whiteSpace: 'pre-wrap', color: 'red' }}>
            {this.state.error?.message ||
              (this.state.error as unknown as string)}
          </Text>
          <ActionButton
            title="Try Again?"
            onClick={this.handleRefreshPage}
            size="md"
            bgColor="blue.200"
          />
        </VStack>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
