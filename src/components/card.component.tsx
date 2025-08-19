import {
  FaRegCalendar,
  FaRegClock,
  FaCheck,
  FaXmark,
  FaGlobe,
  FaLock,
} from "react-icons/fa6";
import { formatDate } from "../helpers/date.helper";
import { NavLink } from "react-router";
import type { Post } from "../modules/post/domain/post.domain";

interface CardProps extends Post {
  toggleAction?: () => void;
}

export const Card = (props: CardProps) => {
  const Wrapper = props.toggleAction ? "div" : NavLink;

  const visibilityConfig = {
    show: {
      label: "Visible",
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
    },
    hide: {
      label: "Oculto",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
    },
  };

  const config = visibilityConfig[props.isActive ? "show" : "hide"];
  const Icon = !props.isActive ? FaLock : FaGlobe;

  return (
    <Wrapper
      to={`/posts/${props.slug}`}
      data-slot="card"
      className={`bg-card relative text-card-foreground flex flex-col gap-6 rounded-xl py-6 overflow-hidden border-0 shadow-sm hover:shadow-md transition-all duration-300 group cursor-pointer ${
        props.toggleAction ? `${config.bgColor} ${config.borderColor}` : ``
      }`}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          alt={props.title}
          loading="lazy"
          decoding="async"
          src={props.image}
          className={`absolute w-full h-full inset-0  object-cover group-hover:scale-105 transition-transform duration-300 ${
            props.isActive ? "" : "grayscale"
          }`}
        />
      </div>

      {props.toggleAction && (
        <div className="absolute top-3 left-3">
          <div
            className={`badge badge-success ${config.color} ${config.bgColor}`}
          >
            <p className="flex items-center gap-1">
              <Icon className="w-3 h-3 mr-1" />
              {config.label}
            </p>
          </div>
        </div>
      )}

      <div data-slot="card-content" className="px-6">
        <div className="flex flex-wrap gap-2 mb-1">
          <span className="badge badge-xs badge-neutral badge-dash capitalize">
            {props.category}
          </span>
        </div>

        <h4 className="text-xl font-light text-gray-900 mb-3 leading-tight group-hover:text-gray-600 transition-colors">
          {props.title}
        </h4>

        <p className="text-gray-600 text-sm mb-4 leading-relaxed">
          {props.excerpt}
        </p>

        <div className="w-full flex items-center text-xs text-gray-500 gap-2">
          <div className="flex items-center gap-1">
            <FaRegCalendar />
            {formatDate(props.date.seconds)}
          </div>
          <div className="flex items-center gap-1">
            <FaRegClock />
            {props.readTime} min. de lectura
          </div>
        </div>

        {props.toggleAction && (
          <div className="absolute bottom-1.5 right-1.5">
            <label className="toggle text-base-content">
              <input
                type="checkbox"
                onChange={props.toggleAction}
                checked={!props.isActive}
              />
              <FaCheck aria-label="enabled" />
              <FaXmark aria-label="disabled" />
            </label>
          </div>
        )}
      </div>
    </Wrapper>
  );
};
