import { FocusModal, clx } from "@medusajs/ui"
import { PropsWithChildren, useEffect, useState } from "react"
import { Path, useNavigate } from "react-router-dom"
import { useRouteModal } from "../route-modal-provider"
import { RouteModalProvider } from "../route-modal-provider/route-provider"
import { StackedModalProvider } from "../stacked-modal-provider"
import { useStateAwareTo } from "../../../../hooks/use-state-aware-to"

type RouteFocusModalProps = PropsWithChildren<{
  prev?: string | Partial<Path>
}>

const Root = ({ prev = "..", children }: RouteFocusModalProps) => {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [stackedModalOpen, onStackedModalOpen] = useState(false)

  const to = useStateAwareTo(prev)

  /**
   * Open the modal when the component mounts. This
   * ensures that the entry animation is played.
   */
  useEffect(() => {
    setOpen(true)

    return () => {
      setOpen(false)
      onStackedModalOpen(false)
    }
  }, [])

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      document.body.style.pointerEvents = "auto"
      navigate(to, { replace: true })
      return
    }

    setOpen(open)
  }

  return (
    <FocusModal open={open} onOpenChange={handleOpenChange}>
      <RouteModalProvider prev={to}>
        <StackedModalProvider onOpenChange={onStackedModalOpen}>
          <Content stackedModalOpen={stackedModalOpen}>{children}</Content>
        </StackedModalProvider>
      </RouteModalProvider>
    </FocusModal>
  )
}

type ContentProps = PropsWithChildren<{
  stackedModalOpen: boolean
}>

const Content = ({ stackedModalOpen, children }: ContentProps) => {
  const { __internal } = useRouteModal()

  const shouldPreventClose = !__internal.closeOnEscape

  return (
    <FocusModal.Content
      onEscapeKeyDown={
        shouldPreventClose
          ? (e) => {
              e.preventDefault()
            }
          : undefined
      }
      className={clx({
        "!bg-ui-bg-disabled !inset-x-5 !inset-y-3": stackedModalOpen,
      })}
    >
      {children}
    </FocusModal.Content>
  )
}

const Header = FocusModal.Header
const Title = FocusModal.Title
const Description = FocusModal.Description
const Footer = FocusModal.Footer
const Body = FocusModal.Body
const Close = FocusModal.Close

/**
 * FocusModal that is used to render a form on a separate route.
 *
 * Typically used for forms creating a resource or forms that require
 * a lot of space.
 */
export const RouteFocusModal = Object.assign(Root, {
  Header,
  Title,
  Body,
  Description,
  Footer,
  Close,
})
