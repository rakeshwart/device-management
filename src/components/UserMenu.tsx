import { useEffect, useId, useRef, useState } from "react";
import {
  ModusWcAvatar,
  ModusWcButton,
  ModusWcCard,
  ModusWcTypography,
} from "@trimble-oss/moduswebcomponents-react";
import { USER_CARD } from "../nav.ts";

export function UserMenu() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) {
      return;
    }

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node | null;
      if (target && menuRef.current?.contains(target)) {
        return;
      }
      setOpen(false);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div className="user-menu" ref={menuRef}>
      <ModusWcButton
        aria-controls={panelId}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-label="Account"
        color="tertiary"
        customClass="user-menu-trigger"
        shape="square"
        size="sm"
        variant="borderless"
        onButtonClick={() => setOpen((current) => !current)}
      >
        <ModusWcAvatar
          key={USER_CARD.name}
          alt={USER_CARD.initials}
          customClass="user-menu-avatar-chip"
          initials={USER_CARD.name}
          shape="circle"
          size="sm"
        />
      </ModusWcButton>
      <div
        id={panelId}
        aria-hidden={!open}
        aria-label="Account"
        className="user-menu-popover"
        hidden={!open}
        role="dialog"
      >
        <ModusWcCard bordered customClass="user-menu-card" padding="compact">
          <div className="user-menu-panel">
            <ModusWcAvatar
              key={USER_CARD.name}
              alt={USER_CARD.initials}
              className="user-menu-avatar-lg-host"
              customClass="user-menu-avatar-lg"
              initials={USER_CARD.name}
              shape="circle"
              size="xl"
            />
            <div className="user-menu-copy">
              <ModusWcTypography
                customClass="user-menu-label"
                hierarchy="p"
                label="Account Name"
                size="xs"
                weight="semibold"
              />
              <ModusWcTypography
                customClass="user-menu-name"
                hierarchy="p"
                label={USER_CARD.name}
                size="sm"
                weight="semibold"
              />
              <ModusWcTypography
                customClass="user-menu-email"
                hierarchy="p"
                label={USER_CARD.email}
                size="xs"
                weight="semibold"
              />
              <ModusWcButton
                color="primary"
                customClass="user-menu-logout"
                size="sm"
                variant="borderless"
                onButtonClick={() => setOpen(false)}
              >
                Log out
              </ModusWcButton>
            </div>
          </div>
        </ModusWcCard>
      </div>
    </div>
  );
}
