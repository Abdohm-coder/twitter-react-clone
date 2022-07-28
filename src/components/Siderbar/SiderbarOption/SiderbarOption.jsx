import "./SiderbarOption.css";

export default function SiderbarOption({ active, text, Icon }) {
  return (
    <div className={"siderbarOption " + (active && "sidebarOption--active")}>
      <Icon />
      <h2>{text}</h2>
    </div>
  );
}
