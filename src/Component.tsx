import * as React from "react";

type Props = {
    count: number;
}

export function Component(props: Props) {
	const [count, setCount] = React.useState(props.count);

	function increment() {
		setCount(count + 1);
	}

	function decrement() {
		setCount(count - 1);
	}

    return (
		<div>
        	<h1>{count}</h1>
			<button data-testid="inc" onClick={increment}>+</button>
			<button data-testid="dec" onClick={decrement}>-</button>
		</div>
    );
};
