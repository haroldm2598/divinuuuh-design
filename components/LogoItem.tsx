interface LogoItemProps {
    icon: string;
    name: string;
}

export default function LogoItem({ icon, name }: LogoItemProps) {
    return (
        <div className="logo-item">
            <div>{icon}</div>
            <span>{name}</span>
        </div>
    );
}
