import * as React from 'react';
import { makeMergeProps, resolveShorthandProps } from '@fluentui/react-utilities';
import { ButtonProps, ButtonState } from './Button.types';
import { useButtonState } from './useButtonState';

/**
 * Consts listing which props are shorthand props.
 */
export const buttonShorthandProps = ['icon', 'children'];

const mergeProps = makeMergeProps<ButtonState>({ deepMerge: buttonShorthandProps });

/**
 * Given user props, returns state and render function for a Button.
 */
export const useButton = (props: ButtonProps, ref: React.Ref<HTMLElement>, defaultProps?: ButtonProps): ButtonState => {
  // Ensure that the `ref` prop can be used by other things (like useFocusRects) to refer to the root.
  // NOTE: We are assuming refs should not mutate to undefined. Either they are passed or not.
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const resolvedRef = ref || React.useRef();
  const state = mergeProps(
    {
      ref: resolvedRef,
      as: 'button',
      icon: { as: 'span' },
      content: { as: 'span', children: props.children },
      loader: { as: 'span' },
    },
    defaultProps,
    resolveShorthandProps(props, buttonShorthandProps),
  );

  useButtonState(state);

  return state;
};
