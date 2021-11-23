import { useLoading, ThreeDots } from '@agney/react-loading';

function Spinner() {
    const { containerProps, indicatorEl } = useLoading({
        loading: true,
        indicator: <ThreeDots width="60"/>,
    });
    return (
        <div {...containerProps}>
            {indicatorEl}
        </div>
    );
}

export default Spinner;