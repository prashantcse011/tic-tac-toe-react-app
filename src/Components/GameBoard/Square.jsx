import Button from 'react-bootstrap/Button';

export default function Square({ value, onClick, variant="light" }) {
    return (
        <Button size='lg' variant={variant} onClick={onClick} >
            {value}
        </Button>
    );
}
