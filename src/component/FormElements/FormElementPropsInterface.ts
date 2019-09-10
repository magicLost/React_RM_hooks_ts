
export interface FormElementProps {
    elementAttrs: { id: string };
    value: string;
    labelValue: string;
    onChange: (event: {}) => void;
    disabled?: boolean;
}